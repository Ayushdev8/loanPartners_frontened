"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/service/api";
import { toast } from "react-toastify";


const partnerTypes = ["SCA",
    "PSB",
    "RRB",
    "NBFC_MFI"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading,setLoading] = useState(false);
  const [form, setForm] = useState({
    partnerName: "",
    partnerType: "SCA",
    partnerPhone: "",
    state:"",
    district:"",
    partnerAddress:"",
    partnerEmail: "",
    fullName: "",
    password: "",
    latitude:"",
    longitude:"",

    
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function nextStep(e) {
    e.preventDefault();
    if (!form.partnerName || !form.state || !form.district) {
      setError("Enter your organisation name and email to continue.");
      return;
    }
    setError("");
    setStep(2);
  }

  async function handleSignup(e) {
    e.preventDefault();
    
    if (form.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", form);

        console.log(res.data);
        
        toast.success("you are registered successfully")

    router.push("/dashboard");

  } catch (err) {
    console.log(err.response?.data);
    
    setError(
      err.response?.data?.message || "Signup failed"
    );
    
  }finally{
    setLoading(false);
    
  }
    
    
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div className="hidden lg:flex lg:w-[42%] bg-hero-gradient text-paper flex-col justify-between px-12 py-14 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo/20 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <span className="text-ink font-display text-[16px] font-semibold">P</span>
          </div>
          <p className="font-display text-[19px]">Partner Registration</p>
        </div>

        <div className="relative">
          <p className="font-display text-[32px] leading-[1.25] max-w-sm">
            One registration, one workspace for every scheme your organisation handles.
          </p>
          <div className="mt-10 space-y-4">
            {["Tell us about your organisation", "Set up your admin login", "Start adding schemes and tracking load"].map(
              (t, i) => (
                <div key={t} className="flex items-center gap-3 text-[14px] text-paper/70">
                  <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[12px] text-paper/90">
                    {i + 1}
                  </span>
                  {t}
                </div>
              )
            )}
          </div>
        </div>

        <p className="relative text-[12.5px] text-paper/40">Registrations are reviewed before verification.</p>
      </div>

      {/* Right panel: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-paper">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <span className="text-ink font-display text-[16px] font-semibold">P</span>
            </div>
            <p className="font-display text-[18px]">Partner Registry</p>
          </div>

          <h1 className="font-display text-[27px] text-ink">Create your account</h1>
          <p className="mt-1.5 text-[14px] text-slate">
            Step {step} of 2 — {step === 1 ? "organisation details" : "admin login"}
          </p>

          <div className="mt-5 flex gap-1.5">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-amber" : "bg-paper-line"}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-amber" : "bg-paper-line"}`} />
          </div>

          {error && (
            <div className="mt-5 rounded-lg border border-clay/30 bg-clay-soft px-3.5 py-2.5 text-[13.5px] text-clay">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={nextStep} className="mt-6 space-y-4">
              <div>
                <label className="field-label">Organisation name</label>
                <input
                  className="field-input"
                  value={form.partnerName}
                  onChange={(e) => update("partnerName", e.target.value)}
                  placeholder="e.g. Northbridge Health Trust"
                  required
                />
              </div>
              <div>
                <label className="field-label">Organisation type</label>
                <select
                  className="field-input"
                  value={form.partnerType}
                  onChange={(e) => update("partnerType", e.target.value)}
                >
                  {partnerTypes.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0) + t.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label">State</label>
                <input
                  
                  className="field-input"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="Delhi"
                  required
                />
              </div>
              <div>
                <label className="field-label">District</label>
                <input
                  
                  className="field-input"
                  value={form.district}
                  onChange={(e) => update("district", e.target.value)}
                  
                  required
                />
              </div>
              <div>
                <label className="field-label">Address</label>
                <input
                  
                  className="field-input"
                  value={form.partnerAddress}
                  onChange={(e) => update("partnerAddress", e.target.value)}
                  
                  required
                />
              </div>
              
              <div>
                <label className="field-label">Phone </label>
                <input
                  className="field-input"
                  value={form.partnerPhone}
                  onChange={(e) => update("partnerPhone", e.target.value)}
                  placeholder="98765 43210"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              <div>
                <label className="field-label">Email</label>
                <input
                  type="email"
                  className="field-input"
                  value={form.partnerEmail}
                  onChange={(e) => update("partnerEmail", e.target.value)}
                  placeholder="your@gmail.com"
                  required
                />
              </div>
              <div>
                <label className="field-label">Full name </label>
                <input
                  className="field-input"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  
                  required
                />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input
                  type="password"
                  className="field-input"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="At least 4 characters"
                  required
                />
              </div>
            
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {loading ? <span>Creating....</span>:<span>Create Account</span> }
                </button>
              </div>
            </form>
          )}

          <p className="mt-8 text-[14px] text-slate">
            Already registered?{" "}
            <Link href="/login" className="text-ink font-medium underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
