import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", // Hostinger mail server
      port: 465,                   
      secure: true,                
      auth: {
        user: "info@biobuildbd.com",   
        pass: "B10bu1ld@Info#",   
      },
    });

    await transporter.sendMail({
      from: `"${name}" <info@biobuildbd.com>`,
      to: "info@biobuildbd.com",  
      replyTo: email,             
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    return NextResponse.json({ success: true, message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("❌ Mail send error:", error);
    return NextResponse.json(
      { success: false, message: "❌ Failed to send message" },
      { status: 500 }
    );
  }
}
