"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setOk(null);
    setErr(null);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        setErr("Nepodařilo se odeslat formulář.");
        return;
      }

      setOk("Zpráva byla odeslána. Ozveme se co nejdříve.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setErr("Chyba připojení. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Popište váš problém</h1>

      <p className="mt-2 text-slate-600">
        Pokud jste nenašli odpovídající problém, napište nám stručně,
        co se s notebookem děje.
      </p>

      <div className="mt-8 rounded-2xl border p-6">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-600">Jméno</span>
              <input
                name="name"
                required
                className="rounded-xl border px-4 py-3"
                placeholder="Vaše jméno"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-600">E‑mail</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-xl border px-4 py-3"
                placeholder="např. ja@email.cz"
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Telefon</span>
            <input
              name="phone"
              className="rounded-xl border px-4 py-3"
              placeholder="+420..."
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Popis problému</span>
            <textarea
              name="message"
              required
              className="min-h-[120px] rounded-xl border px-4 py-3"
              placeholder="Popište co nejpřesněji problém..."
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-slate-600">
              Příloha (foto / video)
            </span>
            <input
              name="attachment"
              type="file"
              className="rounded-xl border px-4 py-3"
              accept="image/*,video/*"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Odesílám…" : "Odeslat zprávu"}
          </button>

          {ok && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
              {ok}
            </div>
          )}

          {err && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
              {err}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}