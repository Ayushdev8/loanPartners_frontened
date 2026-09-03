"use client";

export function Topbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-paper-line bg-paper/90 backdrop-blur px-5 py-4 lg:px-9">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden -ml-1 p-1.5 text-ink" aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <h1 className="font-display text-[21px] text-ink leading-none">{title}</h1>
          {subtitle && <p className="mt-1 text-[13px] text-slate">{subtitle}</p>}
        </div>
      </div>
      <div className="hidden sm:flex h-9 w-9 rounded-full bg-brand-gradient items-center justify-center text-ink text-[13px] font-semibold shadow-panel">
        AR
      </div>
    </header>
  );
}