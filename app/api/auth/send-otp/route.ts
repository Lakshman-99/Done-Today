import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { isAllowedEmail } from "@/services/otp-service";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!isAllowedEmail(email)) {
        return NextResponse.json(
            { error: "Unauthorized domain" },
            { status: 403 }
        );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.oTP.create({
        data: { 
            userEmail: email, 
            code: otp, 
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // expires in 10 minutes
        },
    });

    await sendEmail(email, otp);
    return NextResponse.json({ success: true });
}
