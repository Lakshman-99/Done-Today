import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email: string, otp: string) {
    try {
        await resend.emails.send({
            from: "Donetoday <noreply@lakshman.me>",
            to: email,
            subject: "Your One-Time Password (OTP) for Donetoday",
            html: `
            <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
                <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
                <h1 style="color: #2d7ff9; margin-bottom: 16px;">Donetoday</h1>
                <p style="font-size: 16px; color: #333;">Hello,</p>
                <p style="font-size: 16px; color: #333;">
                    Your One-Time Password (OTP) for Donetoday is:
                </p>
                <div style="text-align: center; margin: 24px 0;">
                    <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #2d7ff9; letter-spacing: 4px; background: #f0f4ff; padding: 16px 32px; border-radius: 6px;">
                    ${otp}
                    </span>
                </div>
                <p style="font-size: 14px; color: #666;">
                    This code will expire in 10 minutes. If you did not request this, please ignore this email.
                </p>
                <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #aaa; text-align: center;">
                    &copy; ${new Date().getFullYear()} Donetoday. All rights reserved.
                </p>
                </div>
            </div>
            `,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
