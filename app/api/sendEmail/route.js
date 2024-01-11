import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { email, message } = body;

  const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
      user: '635148320@qq.com',
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PW,
    },
  });


  // Email content
  const mailOptions = {
    from: '635148320@qq.com',
    to: 'zxh635148320@gmail.com',
    subject: 'Portfolio Contact Email',
    html: `
      <div>
        <p style="font-size: 16px; font-weight: bold;">${email}</p>
        <p style="font-size: 14px; margin-top: 6px;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to send email' });
  }

}