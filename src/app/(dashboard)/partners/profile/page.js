"use client";

import { useState } from "react";
import { currentPartner } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/ui/Badge";

export default function PartnerProfilePage() {
  const [form, setForm] = useState(currentPartner);
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="max-w-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        {/* Summary panel */}
        <div className="card p-5 h-fit">
          <div className="avatar h-14 w-14 text-[18px] mx-auto">
            {(form.name || "P").slice(0, 2).toUpperCase()}
          </div>
          <p className="mt-3 text-center font-display text-[16px] text-ink leading-tight">
            {form.name || "Organisation"}
          </p>
          <p className="mt-1 text-center text-[12.5px] text-slate">
            {form.district}{form.district && form.state ? ", " : ""}{form.state}
          </p>
          <div className="mt-3 flex justify-center">
            <StatusBadge verified={form.isVerified} />
          </div>
          <div className="mt-4 pt-4 border-t border-paper-line space-y-2 text-[12.5px]">
            <p className="text-slate-dim">Email</p>
            <p className="text-ink truncate">{form.email || "—"}</p>
            <p className="text-slate-dim pt-1">Phone</p>
            <p className="text-ink">{form.phone || "—"}</p>
          </div>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSave} className="card p-6 space-y-5">
          <div>
            <h2 className="section-title">Organisation details</h2>
            <p className="text-[13px] text-slate mt-1">Visible to your admin team.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="field-label">Organisation name</label>
              <input
                className="field-input"
                value={form.name || ""}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                className="field-input"
                value={form.email || ""}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">Phone</label>
              <input
                className="field-input"
                value={form.phone || ""}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">State</label>
              <input
                className="field-input"
                value={form.state || ""}
                onChange={(e) => update("state", e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">District</label>
              <input
                className="field-input"
                value={form.district || ""}
                onChange={(e) => update("district", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label">Address</label>
              <textarea
                className="field-input min-h-[80px]"
                value={form.address || ""}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label">Website (optional)</label>
              <input
                className="field-input"
                value={form.website || ""}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-paper-line">
            <button type="submit" className="btn-primary mt-4">
              Save changes
            </button>
            {saved && <span className="text-[13.5px] text-moss mt-4">Saved</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
