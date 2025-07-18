"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckSquare, Target } from "lucide-react";

export function DashboardLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
            {/* Header Loading */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo - Keep actual logo visible */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <CheckSquare className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Target className="w-1.5 h-1.5 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                    DoneToday
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Work Log Dashboard
                                </p>
                            </div>
                        </div>

                        {/* User Info Loading */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Loading */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-5" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Date Range Loading */}
                                <div>
                                    <Skeleton className="h-4 w-20 mb-2" />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </div>

                                {/* Search Loading */}
                                <div>
                                    <Skeleton className="h-4 w-12 mb-1" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                {/* Tag Filter Loading */}
                                <div>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Loading */}
                    <div className="lg:col-span-3">
                        {/* Header Actions Loading */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <Skeleton className="h-8 w-32 mb-2" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <Skeleton className="h-10 w-32" />
                        </div>

                        {/* Work Logs Loading */}
                        <div className="space-y-6">
                            {[1, 2, 3].map((index) => (
                                <Card key={index} className="animate-pulse">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <Skeleton className="h-6 w-3/4 mb-2" />
                                                <div className="flex items-center gap-4">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-4 w-16" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Skeleton className="h-8 w-8" />
                                                <Skeleton className="h-8 w-8" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 mb-4">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-3/4" />
                                        </div>

                                        {/* Tags Loading */}
                                        <div className="flex flex-wrap gap-2">
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-20" />
                                            <Skeleton className="h-5 w-12" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Overlay with Spinner */}
            <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
                    {/* Animated Logo */}
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                            <CheckSquare className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                            <Target className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    {/* Loading Spinner */}
                    <div className="relative">
                        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    </div>

                    {/* Loading Text */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Loading DoneToday
                        </h3>
                        <p className="text-sm text-gray-600">
                            Preparing your workspace...
                        </p>
                    </div>

                    {/* Loading Progress Dots */}
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
