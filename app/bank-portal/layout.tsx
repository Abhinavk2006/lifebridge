"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBankPortalStore } from "@/store/useBankPortalStore";
import { DocumentWatermarkPattern } from "@/components/ui/document-watermark-pattern";
import { 
  LayoutDashboard, 
  FileCheck2, 
  History, 
  BarChart3, 
  Settings, 
  Building, 
  Bell, 
  ShieldCheck, 
  ChevronDown,
  X
} from "lucide-react";

export default function BankPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { notifications, markNotificationRead, selectedBranch, setSelectedBranch } = useBankPortalStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { name: "Claims Overview", href: "/bank-portal", icon: LayoutDashboard },
    { name: "All Claims Queue", href: "/bank-portal/claims", icon: FileCheck2 },
    { name: "Audit Trail & Logs", href: "/bank-portal/audit", icon: History },
    { name: "Branch Analytics", href: "/bank-portal/reports", icon: BarChart3 },
    { name: "Compliance Settings", href: "/bank-portal/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 relative overflow-x-hidden">
      {/* Subtle Document & Legal Stamp Watermark Background Pattern */}
      <DocumentWatermarkPattern />

      {/* Institutional Left Sidebar Navigation */}
      <aside className="w-64 bg-[#1E2761] text-white flex flex-col shrink-0 border-r border-[#1E2761]/20 shadow-lg relative z-10">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#E8B04B] text-[#1E2761] font-serif font-bold text-lg flex items-center justify-center shadow-xs">
            LB
          </div>
          <div>
            <h1 className="font-serif font-bold text-base tracking-tight text-white leading-tight">
              LifeBridge AI
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#CADCFC] opacity-90">
              Bank Partner Portal v2.4
            </p>
          </div>
        </div>

        {/* Branch Selector Pill */}
        <div className="px-4 py-4 border-b border-white/10">
          <label className="text-[10px] font-mono uppercase text-[#CADCFC] block mb-1.5 font-semibold">
            Active Institution Branch
          </label>
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#E8B04B] cursor-pointer appearance-none pr-8"
            >
              <option value="ALL" className="bg-[#1E2761] text-white">All Branches (Regional Hub)</option>
              <option value="Mumbai Main Branch" className="bg-[#1E2761] text-white">SBI — Mumbai Main Branch</option>
              <option value="South Delhi Connaught Place Branch" className="bg-[#1E2761] text-white">SBI — Connaught Place, New Delhi</option>
              <option value="Bengaluru MG Road Branch" className="bg-[#1E2761] text-white">SBI — MG Road, Bengaluru</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#CADCFC] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/bank-portal" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/15 text-white font-semibold border-l-4 border-[#E8B04B] shadow-xs"
                    : "text-[#CADCFC] hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#E8B04B]" : "text-[#CADCFC]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Compliance Seal Stamp Footer */}
        <div className="p-4 m-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#E8B04B] font-mono font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>RBI AUDITED & SEALED</span>
          </div>
          <p className="text-[10px] text-[#CADCFC] leading-relaxed">
            All claim authorizations are cryptographically sealed with SHA-256 hash chaining.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header Bar */}
        <header className="bg-white/90 backdrop-blur-xs border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <Building className="w-4 h-4 text-[#1E2761]" />
              <span>State Bank of India — Fiduciary Claims Operations Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition focus:outline-none"
              >
                <Bell className="w-5 h-5 text-[#1E2761]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 font-sans space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="font-serif font-bold text-sm text-[#1E2761] flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#E8B04B]" />
                      <span>Regulatory Notifications ({notifications.length})</span>
                    </h4>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                          n.read ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-blue-50/50 border-blue-200 text-slate-800 font-medium"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-[#1E2761]">{n.title}</span>
                          <span className="text-slate-400 font-mono text-[10px]">{new Date(n.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Officer Profile Badge */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#1E2761] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                VM
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-tight">Vikram Malhotra</p>
                <p className="text-[10px] font-mono text-slate-500">Senior Compliance Officer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
