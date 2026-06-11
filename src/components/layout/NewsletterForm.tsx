"use client";

import { useState } from "react";
import FlatButton from "@/components/ui/FlatButton";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setMsg("Masukkan email yang valid.");
      return;
    }
    setMsg("Terima kasih sudah subscribe!");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setMsg(""); }}
        placeholder="email@kamu.com"
        className="rounded-flat border-2 border-text-light/30 bg-transparent px-3 py-2 text-sm text-text-light placeholder:text-text-light/40 focus:border-secondary focus:outline-none transition-colors"
      />
      <FlatButton color="accent" size="sm" type="submit">
        Subscribe
      </FlatButton>
      {msg && (
        <p className={`text-xs font-bold ${msg.includes("Terima") ? "text-accent" : "text-primary"}`}>
          {msg}
        </p>
      )}
    </form>
  );
}
