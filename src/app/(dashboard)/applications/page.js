"use client";

import { useState } from "react";
import Link from "next/link";
import { applications } from "@/lib/dummy-applications";
import { ApplicationStatusBadge } from "@/components/ui/Badge";

const filters = ["ALL", "PENDING", "ACCEPTED", "REJECTED"];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL" ? applications : applications.filter((a) => a.status === filter);

  const counts = {
    ALL: applications.length,
    PENDING: applications.filter((a) => a.status === "PENDING").length,
    ACCEPTED: applications.filter((a) => a.status === "ACCEPTED").length,
    REJECTED: applications.filter((a) => a.status === "REJECTED").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p className="text-[14px] text-slate">
          {filtered.length} of {applications.length} application{applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium border transition-all ${
              filter === f
                ? "border-ink bg-ink text-paper shadow-panel"
                : "border-paper-line text-slate hover:border-ink/30 bg-paper-card"
            }`}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
            <span className="ml-1.5 opacity-60">{counts[f]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card empty-state">
          <p className="text-[14.5px] text-ink font-medium">No applications here</p>
          <p className="text-[13.5px] text-slate">Try a different filter.</p>
        </div>
      ) : (
        <div className="card overflow-hidden divide-y divide-paper-line">
          {filtered.map((a) => (
            <Link
              key={a.id}
              href={`/applications/${a.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper/70 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="avatar h-10 w-10 text-[13px]">
                  {a.applicantName.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-[14.5px] text-ink font-medium truncate">{a.applicantName}</p>
                  <p className="text-[12.5px] text-slate-dim truncate">
                    {a.schemeTitle} · {a.schemeId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:block text-[12.5px] text-slate-dim">{a.submittedOn}</span>
                <ApplicationStatusBadge status={a.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}