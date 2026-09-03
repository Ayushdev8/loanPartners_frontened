import Link from "next/link";
import { currentPartner, schemes } from "@/lib/dummy-data";
import { StatCard } from "@/components/ui/StatCard";
import { LoadBadge, StatusBadge } from "@/components/ui/Badge";

export default function DashboardPage() {
  const highLoad = schemes.filter((s) => s.currentLoad === "HIGH").length;
  const avgTurnaround = Math.round(
    schemes.reduce((sum, s) => sum + s.avgTurnaroundDays, 0) / schemes.length
  );

  return (
    <div>
      {/* Hero banner */}
      <div className="rounded-xl bg-hero-gradient text-paper p-6 sm:p-7 mb-7 relative overflow-hidden">
        <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-amber/20 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[13px] text-paper/50">Welcome back</p>
            <h2 className="mt-1 font-display text-[24px]">{currentPartner.name}</h2>
            <p className="mt-1.5 text-[13.5px] text-paper/60">
              {currentPartner.partnerType.charAt(0) + currentPartner.partnerType.slice(1).toLowerCase()} · {currentPartner.district}, {currentPartner.state}
            </p>
          </div>
          <StatusBadge verified={currentPartner.isVerified} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Active schemes" value={schemes.length} accent="#5B5FE8" />
        <StatCard label="Running high load" value={highLoad} hint="schemes flagged HIGH" accent="#BD5B3E" />
        <StatCard label="Avg. turnaround" value={`${avgTurnaround}d`} hint="across all schemes" accent="#4C7A5D" />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-[19px] text-ink">Recent schemes</h2>
          <Link href="/schemes" className="text-[13.5px] text-slate hover:text-ink underline underline-offset-2">
            View all
          </Link>
        </div>

        <div className="card overflow-hidden">
          {schemes.slice(0, 5).map((s, i) => (
            <Link
              key={s.id}
              href={`/schemes/${s.id}`}
              className={`flex items-center justify-between px-5 py-4 hover:bg-paper transition-colors ${
                i !== 0 ? "border-t border-paper-line" : ""
              }`}
            >
              <div>
                <p className="text-[14.5px] text-ink font-medium">{s.schemeId}</p>
                <p className="text-[13px] text-slate mt-0.5">{s.avgTurnaroundDays} day avg. turnaround</p>
              </div>
              <LoadBadge level={s.currentLoad} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
