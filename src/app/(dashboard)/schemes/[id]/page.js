"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { schemes } from "@/lib/dummy-data";

const loadLevels = ["LOW", "MEDIUM", "HIGH"];

export default function SchemeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const found = schemes.find((s) => String(s.id) === String(id)) || schemes[0];

  const [scheme, setScheme] = useState(found);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
  }

  function handleDelete() {
    router.push("/schemes");
  }

  return (
    <div className="max-w-lg">
      <p className="text-[14px] text-slate mb-6">{scheme.schemeId}</p>

      <form onSubmit={handleSave} className="card p-6 space-y-5">
        <div>
          <label className="field-label">Current load</label>
          <div className="flex gap-2">
            {loadLevels.map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => {
                  setScheme((s) => ({ ...s, currentLoad: level }));
                  setSaved(false);
                }}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-[13.5px] transition-all ${
                  scheme.currentLoad === level
                    ? "border-ink bg-ink text-paper shadow-panel"
                    : "border-paper-line text-slate hover:border-ink/40"
                }`}
              >
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="field-label">Average turnaround (days)</label>
          <input
            type="number"
            min="0"
            className="field-input"
            value={scheme.avgTurnaroundDays ?? ""}
            onChange={(e) => {
              setScheme((s) => ({ ...s, avgTurnaroundDays: Number(e.target.value) }));
              setSaved(false);
            }}
          />
        </div>

        {scheme.updatedByName && (
          <p className="text-[13px] text-slate-dim">Last updated by {scheme.updatedByName}</p>
        )}

        <div className="flex items-center gap-3 pt-1">
          <button type="submit" className="btn-primary">
            Save changes
          </button>
          {saved && <span className="text-[13.5px] text-moss">Saved</span>}
          <button type="button" onClick={handleDelete} className="ml-auto text-[13.5px] text-clay hover:underline">
            Remove scheme
          </button>
        </div>
      </form>
    </div>
  );
}
