"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();

  const justRegistered = params.get("registered") === "1";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-paper relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo/10 blur-3xl" />

      <div className="w-full max-w-sm relative">
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <span className="text-ink font-display text-[16px] font-semibold">
              P
            </span>
          </div>

          <p className="font-display text-[19px]">
            Partner Registry
          </p>
        </div>

        <div className="card p-8">
          <h1 className="font-display text-[25px] text-ink">
            Sign in
          </h1>

          <p className="mt-1.5 text-[14px] text-slate">
            Access your partner workspace.
          </p>

          {justRegistered && (
            <div className="mt-5 rounded-lg border border-moss/30 bg-moss-soft px-3.5 py-2.5 text-[13.5px] text-moss">
              Account created. Sign in to continue.
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="field-label">
                Username
              </label>

              <input
                className="field-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="anita.rao"
                required
              />
            </div>

            <div>
              <label className="field-label">
                Password
              </label>

              <input
                type="password"
                className="field-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-[14px] text-slate text-center">
          New partner?{" "}
          <Link
            href="/signup"
            className="text-ink font-medium underline underline-offset-2"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}