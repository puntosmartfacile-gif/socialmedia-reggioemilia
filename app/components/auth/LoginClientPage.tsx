"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function LoginClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const supabase = createClient();
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [magicError, setMagicError] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  const handleMagicLink = async () => {
    setMagicLoading(true);
    setMagicError(null);
    setMagicLinkSent(false);

    const { error } = await supabase.auth.signInWithOtp({
      email: magicEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setMagicError(error.message);
      setMagicLoading(false);
      return;
    }

    setMagicLinkSent(true);
    setMagicLoading(false);
  };

  const handleAdminLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAdminLoading(true);
    setAdminError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (error) {
      setAdminError(error.message);
      setAdminLoading(false);
      return;
    }

    router.push(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
    router.refresh();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFAF7] px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,149,107,0.12),transparent_42%)]" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-[32px] border border-[#2C2C2C]/8 bg-white p-8 shadow-[0_30px_80px_rgba(44,44,44,0.08)] sm:p-10"
      >
        <div className="text-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-3xl font-semibold tracking-tight text-[#2C2C2C]"
          >
            SocialMedia<span className="text-[#B8956B]">RE</span>
          </Link>
          <p className="mt-4 text-sm uppercase tracking-[0.28em] text-[#B8956B]">
            Area Clienti
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">
            Accedi con semplicità
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#2C2C2C]/60">
            Ricevi un link magico via email oppure accedi come amministratore.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[#2C2C2C]">Email</label>
            <input
              type="email"
              placeholder="nome@azienda.it"
              value={magicEmail}
              onChange={(event) => setMagicEmail(event.target.value)}
              className="w-full rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-4 py-3.5 text-sm text-[#2C2C2C] outline-none transition placeholder:text-[#2C2C2C]/35 focus:border-[#B8956B] focus:bg-white"
            />
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={magicLoading || !magicEmail}
              className="w-full rounded-2xl bg-[#B8956B] px-4 py-3.5 text-sm font-medium text-white transition hover:bg-[#A07D5A]"
            >
              {magicLoading ? "Invio in corso..." : "Invia Magic Link"}
            </button>
            {magicError ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {magicError}
              </p>
            ) : null}
            {magicLinkSent ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Controlla la tua email per il link di accesso
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#2C2C2C]/10" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#2C2C2C]/40">
              oppure
            </span>
            <div className="h-px flex-1 bg-[#2C2C2C]/10" />
          </div>

          <form className="space-y-4" onSubmit={handleAdminLogin}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#2C2C2C]">
                Email amministratore
              </label>
              <input
                type="email"
                placeholder="admin@socialmediareggioemilia.it"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                className="w-full rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-4 py-3.5 text-sm text-[#2C2C2C] outline-none transition placeholder:text-[#2C2C2C]/35 focus:border-[#B8956B] focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#2C2C2C]">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                className="w-full rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-4 py-3.5 text-sm text-[#2C2C2C] outline-none transition placeholder:text-[#2C2C2C]/35 focus:border-[#B8956B] focus:bg-white"
              />
            </div>
            {adminError ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {adminError}
              </p>
            ) : null}
            <div className="flex items-center justify-between gap-4">
              <Link href="#" className="text-sm text-[#2C2C2C]/55 transition hover:text-[#B8956B]">
                Password dimenticata?
              </Link>
              <button
                type="submit"
                disabled={adminLoading || !adminEmail || !adminPassword}
                className="rounded-2xl border border-[#2C2C2C]/10 px-5 py-3 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/40 hover:text-[#B8956B]"
              >
                {adminLoading ? "Accesso..." : "Accedi Admin"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}