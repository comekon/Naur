"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import FlatButton from "@/components/ui/FlatButton";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) router.push(user.role === "admin" ? "/admin" : "/");
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Email dan password wajib diisi."); return; }
    const ok = login(email, password);
    if (!ok) setError("Email atau password salah.");
  };

  return (
    <div className="flex min-h-[80vh]">
      {/* Left: Form */}
      <div className="flex w-full items-center justify-center px-6 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl font-bold">Login</h1>
          <p className="mt-2 text-text-muted">Masuk ke akun Naur kamu</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block font-display text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@naur.id"
                className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-display text-sm font-bold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {error && <p className="text-sm text-primary font-bold">{error}</p>}

            <FlatButton type="submit" variant="solid" color="primary" size="lg" className="w-full">
              Login
            </FlatButton>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Belum punya akun?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">Daftar</Link>
          </p>

          <div className="mt-8 rounded-flat border-2 border-text-dark/20 p-4">
            <p className="font-label text-xs font-bold text-text-muted mb-2">Demo accounts:</p>
            <p className="text-xs text-text-muted">User: user@naur.id / user123</p>
            <p className="text-xs text-text-muted">Admin: admin@naur.id / admin123</p>
          </div>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-tertiary">
        <div className="text-center px-8">
          <svg viewBox="0 0 200 200" fill="none" className="mx-auto h-40 w-40 opacity-30">
            <path d="M100 20C100 20 40 80 40 120a60 60 0 00120 0C160 80 100 20 100 20z" stroke="#FAFAFA" strokeWidth="4" strokeLinejoin="round" fill="none" />
            <path d="M100 70c0 0-20 25-20 45a20 20 0 0040 0c0-20-20-45-20-45z" stroke="#FAFAFA" strokeWidth="3" fill="#E63000" opacity="0.4" />
          </svg>
          <h2 className="font-display text-3xl font-bold text-text-light">Naur</h2>
          <p className="mt-2 text-text-light/60">Nyalakan Momenmu</p>
        </div>
      </div>
    </div>
  );
}
