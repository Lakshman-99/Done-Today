"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    ArrowLeft,
    CheckCircle,
    CheckSquare,
    Target,
} from "lucide-react";
import { useRouter } from 'next/navigation'

export default function SignupForm() {
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setStep("otp");
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        
        // Redirect to dashboard
        router.push('/dashboard');
    };

    const handleBack = () => {
        setStep("email");
        setOtp("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl border-0 bg-white relative overflow-hidden">
                    {/* Brand accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600"></div>

                    <CardHeader className="space-y-6 pt-8 pb-6">
                        {/* DoneToday Logo */}
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <CheckSquare className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Target className="w-2.5 h-2.5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                        DoneToday
                                    </h1>
                                    <p className="text-xs text-gray-500 font-medium">
                                        Personal Task Manager
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <CardTitle className="text-2xl font-semibold text-gray-900">
                                {step === "email"
                                    ? "Sign In"
                                    : "Verify your email"}
                            </CardTitle>
                            <CardDescription className="text-gray-600 text-base">
                                {step === "email"
                                    ? "Track your daily tasks"
                                    : `We've sent a verification code to ${email}`}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 pb-8">
                        {step === "email" ? (
                            <form
                                onSubmit={handleEmailSubmit}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Work Email address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your.email@example.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="h-12 pl-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) =>
                                            setRememberMe(checked as boolean)
                                        }
                                        className="border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600 cursor-pointer"
                                    >
                                        Keep me signed in for 30 days
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                    disabled={isLoading || !email}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending verification code...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <CheckSquare className="w-4 h-4" />
                                            Continue to DoneToday
                                        </div>
                                    )}
                                </Button>

                            </form>
                        ) : (
                            <form
                                onSubmit={handleOtpSubmit}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium text-gray-700 block text-center">
                                        Enter verification code
                                    </Label>
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            value={otp}
                                            onChange={(value) => setOtp(value)}
                                        >
                                            <InputOTPGroup>
                                                {[0, 1, 2, 3, 4, 5].map(
                                                    (index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                            className="w-12 h-12 text-lg font-semibold border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                        />
                                                    )
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 mb-2">
                                            Didn't receive the code?
                                        </p>
                                        <button
                                            type="button"
                                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors duration-200"
                                            onClick={() =>
                                                console.log("Resend code")
                                            }
                                        >
                                            Resend verification code
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                        disabled={isLoading || otp.length !== 6}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Accessing your dashboard...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                Access dashboard
                                            </div>
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleBack}
                                        className="w-full h-12 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to email
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Simple footer for personal app */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Secure access to your personal task management system
                    </p>
                </div>
            </div>
        </div>
    );
}
