import fs from 'fs';
import path from 'path';
import https from 'https';

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const fontsDir = path.resolve('src/assets/fonts');

// Helper to make https requests
function fetch(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': USER_AGENT,
        ...headers
      }
    };
    https.get(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        fetch(res.headers.location, headers).then(resolve).catch(reject);
        return;
      }
      let data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

// Download a file
function downloadFile(url, destPath) {
  return fetch(url).then((buffer) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buffer);
    console.log(`Downloaded: ${path.basename(destPath)}`);
  });
}

async function main() {
  try {
    console.log('Fetching Google Fonts CSS...');
    const cssBuffer = await fetch(CSS_URL);
    const cssContent = cssBuffer.toString('utf-8');

    // Parse font-face rules
    // Match structure like:
    // /* subset */
    // @font-face {
    //   font-family: 'FontName';
    //   ...
    //   src: url(https://...) format('woff2');
    //   unicode-range: ...
    // }
    const regex = /\/\*\s*([^*]+?)\s*\*\/\s*@font-face\s*\{([^}]+?)\}/g;
    let match;
    let localCss = '';
    const downloads = [];

    // Ensure output dir exists
    if (!fs.existsSync(fontsDir)) {
      fs.mkdirSync(fontsDir, { recursive: true });
    }

    let fileIndex = 0;
    while ((match = regex.exec(cssContent)) !== null) {
      const subset = match[1].trim().replace(/\s+/g, '-');
      const content = match[2];

      const familyMatch = /font-family:\s*['"]?([^'";]+)['"]?/.exec(content);
      const weightMatch = /font-weight:\s*(\d+)/.exec(content);
      const urlMatch = /src:\s*url\((https:\/\/[^)]+)\)/.exec(content);
      const styleMatch = /font-style:\s*([^;]+)/.exec(content) || [, 'normal'];
      const unicodeRangeMatch = /unicode-range:\s*([^;]+)/.exec(content);

      if (familyMatch && weightMatch && urlMatch) {
        const family = familyMatch[1].replace(/\s+/g, '').toLowerCase();
        const weight = weightMatch[1];
        const fontUrl = urlMatch[1];
        const style = styleMatch[1].trim();
        const range = unicodeRangeMatch ? unicodeRangeMatch[1].trim() : '';

        // Generate filename
        fileIndex++;
        const filename = `${family}-${weight}-${subset}-${fileIndex}.woff2`;
        const destPath = path.join(fontsDir, filename);

        // Queue download
        downloads.push(downloadFile(fontUrl, destPath));

        // Generate local font-face
        localCss += `/* ${subset} */\n`;
        localCss += `@font-face {\n`;
        localCss += `  font-family: '${familyMatch[1]}';\n`;
        localCss += `  font-style: ${style};\n`;
        localCss += `  font-weight: ${weight};\n`;
        localCss += `  font-display: swap;\n`;
        localCss += `  src: url('./${filename}') format('woff2');\n`;
        if (range) {
          localCss += `  unicode-range: ${range};\n`;
        }
        localCss += `}\n\n`;
      }
    }

    console.log(`Starting download of ${downloads.length} font files...`);
    await Promise.all(downloads);

    const outputCssPath = path.resolve('src/assets/fonts/fonts.css');
    fs.writeFileSync(outputCssPath, localCss);
    console.log(`Successfully generated fonts.css at: ${outputCssPath}`);
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
}

main();
