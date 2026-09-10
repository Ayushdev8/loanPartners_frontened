"use client";

export function Topbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-paper-line bg-paper/85 backdrop-blur-md px-5 py-4 lg:px-9">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden -ml-1 p-1.5 rounded-lg text-ink hover:bg-paper-line/60 transition-colors"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <h1 className="font-display text-[21px] text-ink leading-none tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[13px] text-slate">{subtitle}</p>}
        </div>
      </div>
      <div className="avatar hidden sm:flex h-9 w-9 text-[13px]">AR</div>
    </header>
  );
}