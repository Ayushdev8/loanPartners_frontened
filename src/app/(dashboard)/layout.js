"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";

const titles = {
  "/dashboard": { title: "Overview", subtitle: "Snapshot of your organisation's activity" },
  "/partners/profile": { title: "Partner profile", subtitle: "Details visible to your admin team" },
  "/schemes": { title: "Schemes", subtitle: "Track load and turnaround across schemes" },
  "/schemes/new": { title: "New scheme", subtitle: "Register a scheme your organisation processes" },
  "/admins": { title: "Admin users", subtitle: "People who manage schemes for your organisation" },
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const page = titles[pathname] || { title: "Partner Registry" };

  return (
    <div className="min-h-screen flex bg-paper">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <Topbar title={page.title} subtitle={page.subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-5 py-6 lg:px-9 lg:py-8 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}
