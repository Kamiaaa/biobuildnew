import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", // Hostinger mail server
      port: 465,                   // SSL: 465, TLS: 587
      secure: true,
      auth: {
        user: "info@biobuildbd.com",
        pass: "B10bu1ld@Info#", 
      },
    });

    await transporter.sendMail({
      from: `"${name}" <info@biobuildbd.com>`,
      to: "info@biobuildbd.com",
      subject: `Brochure Request from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}`,
    });

    return NextResponse.json({ success: true, message: "✅ Brochure request sent!" });
  } catch (error) {
    console.error("❌ Mail send error:", error);
    return NextResponse.json(
      { success: false, message: "❌ Failed to send brochure request" },
      { status: 500 }
    );
  }
}
