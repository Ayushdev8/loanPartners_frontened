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
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[14px] text-slate">Organisation details visible to your admin team.</p>
        <StatusBadge verified={form.isVerified} />
      </div>

      <form onSubmit={handleSave} className="card p-6 space-y-5">
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

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="btn-primary">
            Save changes
          </button>
          {saved && <span className="text-[13.5px] text-moss">Saved</span>}
        </div>
      </form>
    </div>
  );
}
