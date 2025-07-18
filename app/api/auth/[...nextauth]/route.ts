import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { validateOtpAndFetchUser } from "@/services/otp-service";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: "OTP Login",
            credentials: {
                email: { label: "Email", type: "email" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                const { email, otp } = credentials ?? {};
                if (!email || !otp)
                    throw new Error("Email and OTP are required");

                try {
                    const user = await validateOtpAndFetchUser(email, otp);
                    return user;
                } catch (error) {
                    const message = encodeURIComponent((error as Error).message || "Login failed");
                    throw new Error(message);
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email ?? "";
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
