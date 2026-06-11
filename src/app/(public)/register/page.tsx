"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import FlatButton from "@/components/ui/FlatButton";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) { setError("Semua field wajib diisi."); return; }
    if (!email.includes("@")) { setError("Format email tidak valid."); return; }
    if (password.length < 6) { setError("Password minimal 6 karakter."); return; }
    const ok = register(name, email, password);
    if (!ok) setError("Email sudah terdaftar.");
  };

  return (
    <div className="flex min-h-[80vh]">
      {/* Left: Form */}
      <div className="flex w-full items-center justify-center px-6 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl font-bold">Daftar</h1>
          <p className="mt-2 text-text-muted">Buat akun baru di Naur</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block font-display text-sm font-bold mb-1">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
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
                placeholder="Minimal 6 karakter"
                className="w-full rounded-flat border-2 border-text-dark px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {error && <p className="text-sm text-primary font-bold">{error}</p>}

            <FlatButton type="submit" variant="solid" color="primary" size="lg" className="w-full">
              Daftar
            </FlatButton>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-secondary">
        <div className="text-center px-8">
          <svg viewBox="0 0 200 200" fill="none" className="mx-auto h-40 w-40 opacity-30">
            <path d="M100 20C100 20 40 80 40 120a60 60 0 00120 0C160 80 100 20 100 20z" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" fill="none" />
            <path d="M100 70c0 0-20 25-20 45a20 20 0 0040 0c0-20-20-45-20-45z" stroke="#1A1A1A" strokeWidth="3" fill="#1A1A1A" opacity="0.3" />
          </svg>
          <h2 className="font-display text-3xl font-bold text-text-dark">Naur</h2>
          <p className="mt-2 text-text-dark/60">Nyalakan Momenmu</p>
        </div>
      </div>
    </div>
  );
}
