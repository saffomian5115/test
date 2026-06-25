"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ya password galat hai!");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Kuch gadbad ho gayi, baad me try karein!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B7355] via-[#A0926B] to-[#6B5B45] p-4">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative w-full max-w-md">
        {/* Main card - leather texture */}
        <div className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #5C4A32 0%, #4A3B28 50%, #3D2F1E 100%)",
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(139, 115, 85, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3)
            `,
          }}
        >
          {/* Stitching border effect */}
          <div className="absolute inset-2 rounded-2xl border border-dashed border-amber-700/40 pointer-events-none" />

          {/* Inner card with embossed feel */}
          <div className="relative m-3 rounded-2xl p-8"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 100%)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Logo / Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{
                  background: "linear-gradient(145deg, #C9A96E, #8B7355)",
                  boxShadow: `
                    0 8px 16px rgba(0,0,0,0.4),
                    inset 0 2px 4px rgba(255,255,255,0.3),
                    inset 0 -2px 4px rgba(0,0,0,0.2),
                    0 0 0 3px rgba(201, 169, 110, 0.2)
                  `,
                }}
              >
                <span className="text-4xl">🔒</span>
              </div>
              <h1 className="text-2xl font-bold text-amber-100"
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.1)",
                }}
              >
                Welcome Back
              </h1>
              <p className="text-amber-300/60 text-sm mt-1">
                Apne account me login karein
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-200"
                style={{
                  background: "linear-gradient(145deg, rgba(180,50,50,0.4), rgba(140,30,30,0.6))",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)",
                  border: "1px solid rgba(200,80,80,0.3)",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-amber-200/80 mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-xl text-amber-100 placeholder-amber-400/40 outline-none transition-all duration-200"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 100%)",
                      boxShadow: `
                        inset 0 2px 6px rgba(0,0,0,0.4),
                        inset 0 -1px 0 rgba(255,255,255,0.05),
                        0 1px 0 rgba(255,255,255,0.05)
                      `,
                      border: "1px solid rgba(139, 115, 85, 0.3)",
                    }}
                    placeholder="you@example.com"
                    required
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-amber-200/80 mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-xl text-amber-100 placeholder-amber-400/40 outline-none transition-all duration-200"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 100%)",
                      boxShadow: `
                        inset 0 2px 6px rgba(0,0,0,0.4),
                        inset 0 -1px 0 rgba(255,255,255,0.05),
                        0 1px 0 rgba(255,255,255,0.05)
                      `,
                      border: "1px solid rgba(139, 115, 85, 0.3)",
                    }}
                    placeholder="••••••••"
                    required
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
              </div>

              {/* Login Button - metallic/glass feel */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-amber-950 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "linear-gradient(145deg, #A08060, #806040)"
                    : "linear-gradient(145deg, #D4A853 0%, #C9A96E 40%, #B8954A 60%, #A08040 100%)",
                  boxShadow: `
                    0 4px 12px rgba(0,0,0,0.4),
                    inset 0 1px 2px rgba(255,255,255,0.4),
                    inset 0 -2px 4px rgba(0,0,0,0.15),
                    0 1px 0 rgba(255,255,255,0.1)
                  `,
                  textShadow: "0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Login ho raha hai...
                  </span>
                ) : (
                  "🔐 Login Karein"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,115,85,0.4), transparent)" }} />
              <span className="text-xs text-amber-400/50 uppercase tracking-wider">ya phir</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,115,85,0.4), transparent)" }} />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full py-3 rounded-xl font-medium text-white text-sm flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(145deg, #4285F4, #3367D6)",
                  boxShadow: `
                    0 4px 12px rgba(66, 133, 244, 0.3),
                    inset 0 1px 2px rgba(255,255,255,0.2),
                    inset 0 -1px 2px rgba(0,0,0,0.2)
                  `,
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google se Login
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-full py-3 rounded-xl font-medium text-white text-sm flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(145deg, #333, #242424)",
                  boxShadow: `
                    0 4px 12px rgba(0,0,0,0.4),
                    inset 0 1px 2px rgba(255,255,255,0.1),
                    inset 0 -1px 2px rgba(0,0,0,0.3)
                  `,
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub se Login
              </button>
            </div>

            {/* Register link */}
            <div className="mt-6 text-center">
              <p className="text-amber-300/50 text-sm">
                Naya user hain?{" "}
                <Link
                  href="/register"
                  className="text-amber-200 font-semibold hover:text-amber-100 transition-colors"
                  style={{ textShadow: "0 0 8px rgba(212, 168, 83, 0.3)" }}
                >
                  Register karein
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
