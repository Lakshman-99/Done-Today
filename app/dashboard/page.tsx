"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { WorkLogList } from "@/components/work-log-list";
import { WorkLogDialog } from "@/components/work-log-dialog";

export default function Dashboard() {

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
