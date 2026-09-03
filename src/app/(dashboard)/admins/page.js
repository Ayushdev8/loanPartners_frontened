"use client";

import { useState } from "react";
import { admins as initialAdmins } from "@/lib/dummy-data";

export default function AdminsPage() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullName: "", username: "", password: "" });

  function handleInvite(e) {
    e.preventDefault();
    setAdmins((a) => [
      ...a,
      { id: a.length + 1, username: form.username, fullName: form.fullName, role: "PARTNER_ADMIN" },
    ]);
    setForm({ fullName: "", username: "", password: "" });
    setShowForm(false);
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[14px] text-slate">People who can manage schemes for your organisation.</p>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? "Cancel" : "Add admin"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleInvite} className="card p-6 space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Full name</label>
              <input
                className="field-input"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="field-label">Username</label>
              <input
                className="field-input"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label">Temporary password</label>
              <input
                type="password"
                className="field-input"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Add admin
          </button>
        </form>
      )}

      <div className="card overflow-hidden">
        {admins.map((a, i) => (
          <div
            key={a.id}
            className={`flex items-center justify-between px-5 py-4 ${i !== 0 ? "border-t border-paper-line" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-brand-gradient flex items-center justify-center text-ink text-[13px] font-semibold">
                {a.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-[14.5px] text-ink font-medium">{a.fullName}</p>
                <p className="text-[13px] text-slate mt-0.5">@{a.username}</p>
              </div>
            </div>
            <span className="text-[12.5px] text-slate-dim bg-paper px-2.5 py-1 rounded-full border border-paper-line">
              {a.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
