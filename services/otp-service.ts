import { prisma } from "@/lib/prisma";
import { ALLOWED_DOMAINS, EXCEPTIONAL_EMAILS } from "@/lib/constants";

export function isAllowedEmail(email: string): boolean {
    const domain = email.split("@")[1];
    return (
        ALLOWED_DOMAINS.includes(domain) || EXCEPTIONAL_EMAILS.includes(email)
    );
}

export async function validateOtpAndFetchUser(email: string, otp: string) {
    if (!isAllowedEmail(email)) throw new Error("Email not allowed");

    const otpRecord = await prisma.oTP.findFirst({
        where: { userEmail: email },
        orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) throw new Error("No OTP found for this email, please request a new one");
    if (otpRecord.code !== otp) throw new Error("Invalid OTP, please try again");

    const now = new Date();
    const expiry = new Date(otpRecord.createdAt.getTime() + 5 * 60 * 1000);

    if (now > expiry) throw new Error("OTP expired, please request a new one");

    // Create user if not exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                role: "VIEWER",
            },
        });
    }

    await prisma.oTP.delete({ where: { id: otpRecord.id } });
    return user;
}
