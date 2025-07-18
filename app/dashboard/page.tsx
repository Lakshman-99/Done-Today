"use client"; // if you're using Next.js 13 app dir with client components

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { WorkLogList } from "@/components/work-log-list";
import { WorkLogDialog } from "@/components/work-log-dialog";
import { DashboardLoading } from "@/components/skeleton";

export default function Dashboard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn(); // redirect to login page
        }
    }, [status]);

    if (status === "loading" || !session) {
        return <DashboardLoading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <Sidebar />
                    <WorkLogList />
                </div>
            </div>

            <WorkLogDialog />
        </div>
    );
}
