"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { schemes, currentPartner } from "@/lib/dummy-data";
import { StatCard } from "@/components/ui/StatCard";
import { LoadBadge, StatusBadge } from "@/components/ui/Badge";
import { api2 } from "@/service/api";


export default function DashboardPage() {
  const highLoad = schemes.filter((s) => s.currentLoad === "HIGH").length;
  const avgTurnaround = Math.round(
    schemes.reduce((sum, s) => sum + s.avgTurnaroundDays, 0) / schemes.length
  );

  const [allSchemes, setAllSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllSchemes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api2.get("/get-schemes");
      setAllSchemes(res.data.data);
    } catch (err) {
      console.log(err.response?.data);
      setError("Couldn't load schemes right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSchemes();
  }, []);

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
              {currentPartner.partnerType.charAt(0) + currentPartner.partnerType.slice(1).toLowerCase()} ·{" "}
              {currentPartner.district}, {currentPartner.state}
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

      {/* Your existing recent-schemes block */}
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

      {/* All government schemes — fetched from API */}
      <div className="mt-9">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <div>
            <h2 className="font-display text-[19px] text-ink">All government schemes</h2>
            <p className="text-[13px] text-slate mt-0.5">Browse available schemes, or add one to your organisation.</p>
          </div>
          <Link href="/schemes/new" className="btn-primary">
            + Add scheme
          </Link>
        </div>

        {loading ? (
          <SchemeListSkeleton />
        ) : error ? (
          <div className="card px-5 py-10 text-center">
            <p className="text-[14.5px] text-clay">{error}</p>
            <button onClick={getAllSchemes} className="btn-secondary mt-4 inline-flex">
              Try again
            </button>
          </div>
        ) : allSchemes.length === 0 ? (
          <div className="card px-5 py-10 text-center">
            <p className="text-[14.5px] text-ink">No schemes found</p>
            <p className="mt-1 text-[13.5px] text-slate">Check back later or add one manually.</p>
          </div>
        ) : (
          <div className="card overflow-hidden divide-y divide-paper-line">
            {allSchemes.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper transition-colors group"
              >
                <Link href={`/schemes/${s.id}`} className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-soft flex items-center justify-center text-indigo text-[13px] font-semibold">
                    {s.id.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14.5px] text-ink font-medium truncate group-hover:underline underline-offset-2">
                      {s.title}
                    </p>
                    <p className="text-[12.5px] text-slate-dim mt-0.5">{s.id}</p>
                  </div>
                </Link>

                <Link
                  href={{ pathname: "/schemes/new", query: { schemeId: s.id, title: s.title } }}
                  className="btn-secondary shrink-0 !px-3 !py-1.5 text-[13px]"
                >
                  Add
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SchemeListSkeleton() {
  return (
    <div className="card overflow-hidden divide-y divide-paper-line">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
          <div className="h-10 w-10 rounded-lg bg-paper-line shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-2/3 rounded bg-paper-line" />
            <div className="h-2.5 w-1/3 rounded bg-paper-line" />
          </div>
          <div className="h-7 w-14 rounded-lg bg-paper-line shrink-0" />
        </div>
      ))}
    </div>
  );
}