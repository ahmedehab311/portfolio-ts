import { connectDB } from "@/lib/db";
import { Contact } from "@/models/contact/contact";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, subject, message } = body;

        // 1. حفظ في الداتابيز (عشان لو الإيميل منفعش نلاقي الداتا)
        await Contact.create({ name, email, subject, message });

        // 2. إرسال الإيميل لنفسك
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>", 
            to: "ahmedehab.aa47@gmail.com", 
            subject: `New Message: ${subject}`,
            html: `
        <h2>You got a new message from your portfolio!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return NextResponse.json({ success: true, message: "Sent successfully!" }, { status: 201 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: "Error sending message" }, { status: 500 });
    }
}