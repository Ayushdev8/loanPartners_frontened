"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview", icon: GridIcon },
  { href: "/partners/profile", label: "Partner profile", icon: BuildingIcon },
  { href: "/schemes", label: "Schemes", icon: LayersIcon },
  { href: "/admins", label: "Admin users", icon: UsersIcon },
];

export function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-ink-gradient text-paper flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <span className="text-ink font-display text-[16px] font-semibold">P</span>
            </div>
            <p className="font-display text-[18px] leading-none">Partner Registry</p>
          </div>
          <p className="mt-2 text-[12.5px] text-paper/45">Admin console</p>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14.5px] transition-all ${
                  active
                    ? "bg-white/10 text-paper shadow-panel"
                    : "text-paper/55 hover:text-paper hover:bg-white/5"
                }`}
              >
                <Icon active={active} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3">
            <div className="h-9 w-9 rounded-full bg-brand-gradient flex items-center justify-center text-ink text-[13px] font-semibold">
              AR
            </div>
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
