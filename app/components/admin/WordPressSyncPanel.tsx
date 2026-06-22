"use client";

import { useMemo, useState } from "react";
import type { WpSyncLogRow } from "@/app/types/database";

type SyncResponse = {
  success: boolean;
  result?: {
    postsSynced: number;
    postsUpdated: number;
    postsSkipped: number;
    errors: Array<{ message: string; postId?: number; slug?: string }>;
    status: "success" | "failed";
    completedAt: string;
  };
  error?: string;
};

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function WordPressSyncPanel({
  history,
}: {
  history: WpSyncLogRow[];
}) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [result, setResult] = useState<SyncResponse["result"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const latest = useMemo(() => history[0] ?? null, [history]);

  async function handleSync() {
    setIsSyncing(true);
    setError(null);

    try {
      const response = await fetch("/api/sync/wordpress", {
        method: "POST",
      });
      const payload = (await response.json()) as SyncResponse;

      if (!response.ok || !payload.success || !payload.result) {
        throw new Error(payload.error ?? "Sincronizzazione non riuscita.");
      }

      setResult(payload.result);
      window.location.reload();
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : "Errore sconosciuto.");
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#2C2C2C]/8 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#2C2C2C]">Sincronizza WordPress</h2>
            <p className="mt-1 text-sm text-[#2C2C2C]/65">
              Importa automaticamente tutti gli articoli pubblicati da WordPress per la sezione Pillole e Appunti di Viaggio.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center justify-center rounded-xl bg-[#B8956B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#A07D5A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSyncing ? "Sincronizzazione in corso..." : "Sincronizza WordPress"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#2C2C2C]/45">Ultimo stato</p>
            <p className="mt-2 text-lg font-semibold text-[#2C2C2C]">
              {latest?.status === "success"
                ? "Completato"
                : latest?.status === "failed"
                  ? "Con errori"
                  : latest?.status === "running"
                    ? "In corso"
                    : "Mai eseguito"}
            </p>
          </div>
          <div className="rounded-2xl bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#2C2C2C]/45">Ultima esecuzione</p>
            <p className="mt-2 text-lg font-semibold text-[#2C2C2C]">{formatDateTime(latest?.started_at ?? null)}</p>
          </div>
          <div className="rounded-2xl bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#2C2C2C]/45">Nuovi sincronizzati</p>
            <p className="mt-2 text-lg font-semibold text-[#2C2C2C]">{latest?.posts_synced ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#2C2C2C]/45">Aggiornati / saltati</p>
            <p className="mt-2 text-lg font-semibold text-[#2C2C2C]">
              {(latest?.posts_updated ?? 0)} / {(latest?.posts_skipped ?? 0)}
            </p>
          </div>
        </div>

        {(result || error) && (
          <div className={`mt-6 rounded-2xl border p-4 ${error ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}>
            {error ? (
              <p className="text-sm font-medium text-rose-700">{error}</p>
            ) : (
              <div className="space-y-2 text-sm text-emerald-900">
                <p className="font-medium">Sincronizzazione completata.</p>
                <p>
                  {result?.postsSynced ?? 0} sincronizzati, {result?.postsUpdated ?? 0} aggiornati,{" "}
                  {result?.postsSkipped ?? 0} saltati.
                </p>
                {(result?.errors.length ?? 0) > 0 && (
                  <ul className="list-disc space-y-1 pl-5">
                    {result?.errors.map((entry, index) => (
                      <li key={`${entry.postId ?? "generic"}-${index}`}>
                        {entry.slug ? `${entry.slug}: ` : ""}
                        {entry.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-[#2C2C2C]/8 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#2C2C2C]">Storico sincronizzazioni</h3>
            <p className="mt-1 text-sm text-[#2C2C2C]/65">Ultime 10 esecuzioni con esito e contatori.</p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-[#2C2C2C]/8 text-sm">
            <thead>
              <tr className="text-left text-[#2C2C2C]/55">
                <th className="px-3 py-3 font-medium">Avvio</th>
                <th className="px-3 py-3 font-medium">Completamento</th>
                <th className="px-3 py-3 font-medium">Stato</th>
                <th className="px-3 py-3 font-medium">Nuovi</th>
                <th className="px-3 py-3 font-medium">Aggiornati</th>
                <th className="px-3 py-3 font-medium">Saltati</th>
                <th className="px-3 py-3 font-medium">Errori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C2C2C]/6">
              {history.map((entry) => (
                <tr key={entry.id} className="text-[#2C2C2C]">
                  <td className="px-3 py-3">{formatDateTime(entry.started_at)}</td>
                  <td className="px-3 py-3">{formatDateTime(entry.completed_at)}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        entry.status === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : entry.status === "failed"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">{entry.posts_synced}</td>
                  <td className="px-3 py-3">{entry.posts_updated}</td>
                  <td className="px-3 py-3">{entry.posts_skipped}</td>
                  <td className="px-3 py-3">{Array.isArray(entry.errors) ? entry.errors.length : 0}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-[#2C2C2C]/55">
                    Nessuna sincronizzazione registrata.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}