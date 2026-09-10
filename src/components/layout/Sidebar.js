"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { applications } from "@/lib/dummy-applications";

const links = [
  { href: "/dashboard", label: "Overview", icon: GridIcon },
  { href: "/partners/profile", label: "Partner profile", icon: BuildingIcon },
  { href: "/schemes", label: "Schemes", icon: LayersIcon },
  { href: "/applications", label: "Applications", icon: InboxIcon, badgeKey: "pending" },
  { href: "/admins", label: "Admin users", icon: UsersIcon },
];

export function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const pendingCount = applications.filter((a) => a.status === "PENDING").length;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-ink-gradient text-paper flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-panel">
              <span className="text-paper font-display text-[16px] font-semibold">P</span>
            </div>
            <p className="font-display text-[18px] leading-none tracking-tight">Partner Registry</p>
          </div>
          <p className="mt-2.5 text-[12px] uppercase tracking-[0.08em] text-paper/40">Admin console</p>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            const badgeCount = link.badgeKey === "pending" ? pendingCount : null;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] transition-all ${
                  active
                    ? "bg-white/10 text-paper shadow-panel"
                    : "text-paper/55 hover:text-paper hover:bg-white/5"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-amber" />
                )}
                <Icon active={active} />
                <span className="flex-1">{link.label}</span>
                {badgeCount > 0 && (
                  <span className="rounded-full bg-amber text-ink text-[11px] font-semibold px-1.5 py-0.5 leading-none min-w-[18px] text-center">
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
            <div className="avatar h-9 w-9 text-[13px]">AR</div>
            <div className="min-w-0">
              <p className="text-[13.5px] text-paper truncate">Anita Rao</p>
              <p className="text-[12px] text-paper/45 truncate">Partner admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function GridIcon({ active }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={active ? "opacity-100" : "opacity-70"}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function BuildingIcon({ active }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={active ? "opacity-100" : "opacity-70"}>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 8h.01M8 12h.01M8 16h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function LayersIcon({ active }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={active ? "opacity-100" : "opacity-70"}>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function InboxIcon({ active }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={active ? "opacity-100" : "opacity-70"}>
      <path
        d="M3.5 13.5h4.7l1.3 2.5h5l1.3-2.5h4.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M5.2 6.4A1.7 1.7 0 0 1 6.8 5.2h10.4a1.7 1.7 0 0 1 1.6 1.2L21 13.5v4a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-4l2.2-7.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UsersIcon({ active }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className={active ? "opacity-100" : "opacity-70"}>
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 20c.7-3.4 3-5.2 5.5-5.2s4.8 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15.5 5.3c1.4.4 2.4 1.6 2.4 3s-1 2.6-2.4 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 14.9c2 .5 3.4 1.9 3.9 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}