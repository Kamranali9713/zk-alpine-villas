"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-cloud rounded-sm p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Babar & Brothers Builders & Developers" className="h-14 w-auto mb-4" />
        <p className="text-sm text-slate mb-6">Admin dashboard sign in</p>

        <label className="block text-sm text-slate mb-1.5">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/15 rounded-sm px-4 py-2.5 mb-4 focus:outline-none focus:border-pine"
        />

        <label className="block text-sm text-slate mb-1.5">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/15 rounded-sm px-4 py-2.5 mb-6 focus:outline-none focus:border-pine"
        />

        {error && <p className="text-sm text-clay mb-4">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-sm bg-pine text-cloud py-3 text-sm hover:bg-pineLight transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
