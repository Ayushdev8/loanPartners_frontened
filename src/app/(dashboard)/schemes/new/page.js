"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/service/api";
import { toast } from "react-toastify";

const loadLevels = ["LOW", "MEDIUM", "HIGH"];

export default function NewSchemePage() {
  const router = useRouter();
  const [schemeId, setSchemeId] = useState("");
  const [currentLoad, setCurrentLoad] = useState("LOW");
  const [avgTurnaroundDays, setAvgTurnaroundDays] = useState("");
  const [loading,setLoading] = useState(false);
  const partnerId =1;
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try{
      const res = api.post(`/public/add/scheme/${partnerId}`,{
        "schemeId":schemeId,
        "avgTurnaroundDays":avgTurnaroundDays,
        "loadLevel":currentLoad

      })
      console.log(res.data);
      toast.success("Scheme added successfully")
      router.push("/schemes");
    }catch(err){
      console.log(err.response?.data);

    }finally{
      setLoading(false);
    }
    
  }

  return (
    <div className="max-w-lg">
      <p className="text-[14px] text-slate mb-6">
        Register a scheme your organisation processes, and set its current load.
      </p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="field-label">Scheme ID</label>
          <input
            className="field-input"
            value={schemeId}
            onChange={(e) => setSchemeId(e.target.value)}
            placeholder="e.g. SCH-2026-014"
            required
          />
        </div>

        <div>
          <label className="field-label">Current load</label>
          <div className="flex gap-2">
            {loadLevels.map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => setCurrentLoad(level)}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-[13.5px] transition-all ${
                  currentLoad === level
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
            value={avgTurnaroundDays}
            onChange={(e) => setAvgTurnaroundDays(e.target.value)}
            placeholder="e.g. 5"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" className="btn-primary flex-1">
            {loading ? <span>Wait...</span>:<span>Add Scheme</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
