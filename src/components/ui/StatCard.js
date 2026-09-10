export function StatCard({ label, value, hint, accent }) {
  return (
    <div className="card card-hover p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent || "#D3791F" }} />
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.12]"
        style={{ background: accent || "#D3791F" }}
      />
      <p className="text-[13px] text-slate relative">{label}</p>
      <p className="mt-2 font-display text-[34px] leading-none text-ink relative">{value}</p>
      {hint && <p className="mt-2.5 text-[12.5px] text-slate-dim relative">{hint}</p>}
    </div>
  );
}