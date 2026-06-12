import fs from 'fs';
import path from 'path';
import { BRAND_CONFIG } from '../src/config.js';

const siteUrl = BRAND_CONFIG.siteUrl || 'https://smartelectric.pages.dev';
const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

// YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${cleanSiteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${cleanSiteUrl}/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanSiteUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${cleanSiteUrl}/portfolio</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanSiteUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${cleanSiteUrl}/sitemap.xml
`;

const sitemapPath = path.resolve('public/sitemap.xml');
const robotsPath = path.resolve('public/robots.txt');
const htmlPath = path.resolve('index.html');

console.log(`Generating sitemap.xml for ${cleanSiteUrl}...`);
fs.writeFileSync(sitemapPath, sitemapContent.trim() + '\n');
console.log('Saved public/sitemap.xml');

console.log(`Generating robots.txt pointing to ${cleanSiteUrl}/sitemap.xml...`);
fs.writeFileSync(robotsPath, robotsContent.trim() + '\n');
console.log('Saved public/robots.txt');

// Dynamically replace domain references in index.html to avoid duplicate domains
if (fs.existsSync(htmlPath)) {
  console.log(`Updating site url in index.html to ${cleanSiteUrl}...`);
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Find all meta/link elements containing smartelectric.pages.dev and replace them with the current config URL
  // We match http/https followed by pages.dev or any other domain previously set in the index.html
  // To make it very robust, we will look for whatever is inside the canonical link and replace it,
  // or simple search-replace the default 'https://smartelectric.pages.dev' pattern.
  const defaultDomain = 'https://smartelectric.pages.dev';
  
  // Read what domain is currently in index.html canonical link to replace it correctly if it was already updated before
  const canonicalMatch = /<link rel="canonical" href="([^"]+)"/.exec(htmlContent);
  const currentDomainInHtml = canonicalMatch ? canonicalMatch[1].replace(/\/$/, '') : defaultDomain;
  
  if (currentDomainInHtml !== cleanSiteUrl) {
    const escapedDomain = currentDomainInHtml.replace(/\./g, '\\.').replace(/\//g, '\\/');
    const regex = new RegExp(escapedDomain, 'g');
    htmlContent = htmlContent.replace(regex, cleanSiteUrl);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`Saved index.html updates (Replaced ${currentDomainInHtml} with ${cleanSiteUrl}).`);
  } else {
    console.log('Domain is already correct in index.html.');
  }
}
