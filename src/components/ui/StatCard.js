export function StatCard({ label, value, hint, accent }) {
  return (
    <div className="card p-5 relative overflow-hidden">
      <div
        className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-[0.14]"
        style={{ background: accent || "#E2A33B" }}
      />
      <p className="text-[13px] text-slate relative">{label}</p>
      <p className="mt-2 font-display text-[34px] leading-none text-ink relative">{value}</p>
      {hint && <p className="mt-2 text-[12.5px] text-slate-dim relative">{hint}</p>}
    </div>
  );
}