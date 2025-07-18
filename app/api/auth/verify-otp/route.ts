import { NextResponse } from "next/server";
import { validateOtpAndFetchUser } from "@/services/otp-service";

export async function POST(req: Request) {
    const { email, otp, rememberMe } = await req.json();

    try {
        const user = await validateOtpAndFetchUser(email, otp);
        if (!user) {
            throw new Error("Invalid OTP");
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 401 });
    }

    return NextResponse.json({ success: true });
}
