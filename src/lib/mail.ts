import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  const t = getTransporter();
  if (!t) return;

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  try {
    await t.sendMail({
      from: `"OPA Website" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[OPA Contact] Tin nhắn mới từ ${data.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#155eef">Tin Nhắn Mới Từ Website</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#667085;width:80px">Tên</td><td style="padding:8px 0;font-weight:600">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#667085">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0">
            <p style="margin:0;color:#344054;white-space:pre-wrap">${data.message}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#98a2b3">Gửi từ opa-blog.vercel.app</p>
        </div>
      `,
      replyTo: data.email,
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
  }
}

export async function sendNewsletterWelcome(email: string) {
  const t = getTransporter();
  if (!t) return;

  try {
    await t.sendMail({
      from: `"OPA Blog" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Chào mừng bạn đến với OPA Blog!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;text-align:center;padding:40px 20px">
          <h1 style="color:#155eef;font-size:24px">OPA</h1>
          <h2 style="color:#101828;margin-top:16px">Đăng Ký Thành Công!</h2>
          <p style="color:#667085;line-height:1.6">
            Cảm ơn bạn đã đăng ký nhận tin từ OPA Blog. Bạn sẽ nhận được những bài viết mới nhất
            về AI, Marketing và Công nghệ.
          </p>
          <a href="https://opa-blog.vercel.app/blog" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#155eef;color:white;text-decoration:none;border-radius:8px;font-weight:600">
            Đọc Blog Ngay
          </a>
          <p style="margin-top:24px;font-size:12px;color:#98a2b3">OPA Blog — AI Insights & Technology</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send newsletter welcome:", err);
  }
}
