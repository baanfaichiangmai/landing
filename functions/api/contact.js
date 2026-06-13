export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. Get environment variables
  const resendApiKey = env.RESEND_API_KEY;
  const senderEmail = env.SENDER_EMAIL || 'noreply@baanfaichiangmai.com';
  const recipientEmail = env.RECIPIENT_EMAIL || 'support@baanfaichiangmai.com';

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not defined in environment variables.');
    return new Response(JSON.stringify({ error: 'Server configuration error: missing API key.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Parse request body
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { name, phone, email, serviceTitle, message } = body;

  // 3. Validation
  if (!name || !name.trim()) {
    return new Response(JSON.stringify({ error: 'กรุณากรอกชื่อ-นามสกุล' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (!phone || !phone.trim()) {
    return new Response(JSON.stringify({ error: 'กรุณากรอกเบอร์โทรศัพท์ติดต่อ' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (!message || !message.trim()) {
    return new Response(JSON.stringify({ error: 'กรุณากรอกรายละเอียดปัญหาหรือข้อความของคุณ' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4. Construct Email HTML
  const sanitizedName = escapeHtml(name.trim());
  const sanitizedPhone = escapeHtml(phone.trim());
  const sanitizedEmail = email && email.trim() ? escapeHtml(email.trim()) : '';
  const sanitizedService = serviceTitle ? escapeHtml(serviceTitle) : 'ทั่วไป';
  const sanitizedMessage = escapeHtml(message.trim()).replace(/\n/g, '<br />');
  
  const timestamp = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 20px auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0f172a; padding: 24px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">แจ้งติดต่อใหม่จากหน้าเว็บไซต์</h2>
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 14px;">Baan Fai Chiang Mai (บ้านไฟเชียงใหม่)</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563; width: 140px; font-size: 14px;">ชื่อ-นามสกุล:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${sanitizedName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563; font-size: 14px;">เบอร์โทรศัพท์:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="tel:${sanitizedPhone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${sanitizedPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563; font-size: 14px;">อีเมลติดต่อ:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              ${sanitizedEmail ? `<a href="mailto:${sanitizedEmail}" style="color: #2563eb; text-decoration: none;">${sanitizedEmail}</a>` : '<span style="color: #9ca3af; font-style: italic;">ไม่ได้ระบุ</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563; font-size: 14px;">ประเภทบริการ:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 6px; font-weight: 500; font-size: 13px; display: inline-block;">${sanitizedService}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #4b5563; font-size: 14px;">วันที่ส่งข้อมูล:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563; font-size: 14px;">${timestamp}</td>
          </tr>
          <tr style="vertical-align: top;">
            <td style="padding: 12px 0 0 0; font-weight: 600; color: #4b5563; font-size: 14px;">รายละเอียดงาน:</td>
            <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280; margin: 0;">
          อีเมลแจ้งเตือนอัตโนมัติจากระบบแบบฟอร์มหน้าเว็บไซต์ <a href="https://baanfaichiangmai.com" style="color: #6b7280; text-decoration: underline;">baanfaichiangmai.com</a>
        </p>
      </div>
    </div>
  `;

  // 5. Send email via Resend API
  try {
    const payload = {
      from: `Baan Fai Chiang Mai Website <${senderEmail}>`,
      to: [recipientEmail],
      subject: `[แจ้งงาน] ${sanitizedService} - คุณ ${sanitizedName}`,
      html: emailHtml
    };

    if (sanitizedEmail) {
      payload.reply_to = sanitizedEmail;
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      const errorMsg = errorData.message || `HTTP ${resendResponse.status}`;
      console.error(`Resend API Error details: ${JSON.stringify(errorData)}`);
      return new Response(JSON.stringify({ error: `Resend API failed: ${errorMsg}` }), {
        status: resendResponse.status || 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await resendResponse.json();
    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Network or unexpected error when calling Resend:', error);
    return new Response(JSON.stringify({ error: `Failed to send email: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Simple HTML escaping to prevent injection
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
