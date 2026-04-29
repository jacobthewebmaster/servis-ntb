"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

const inputClass =
  "rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

export default function OrderFormPage() {
  const router = useRouter();
  const problem = useOrderStore((s) => s.problem);
  const { name, email, phone, note, setContact } = useOrderStore();

  const [device, setDevice] = useState("");
  const [condition, setCondition] = useState("");
  const [conditionNote, setConditionNote] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [photoClosedPreview, setPhotoClosedPreview] = useState<string | null>(null);
  const [photoClosedName, setPhotoClosedName] = useState<string | null>(null);
  const [photoOpenPreview, setPhotoOpenPreview] = useState<string | null>(null);
  const [photoOpenName, setPhotoOpenName] = useState<string | null>(null);

  function handleFile(file: File | undefined, type: "closed" | "open") {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "closed") {
      setPhotoClosedPreview(preview);
      setPhotoClosedName(file.name);
    } else {
      setPhotoOpenPreview(preview);
      setPhotoOpenName(file.name);
    }
  }

  function removeFile(type: "closed" | "open") {
    if (type === "closed") {
      setPhotoClosedPreview(null);
      setPhotoClosedName(null);
    } else {
      setPhotoOpenPreview(null);
      setPhotoOpenName(null);
    }
  }

  if (!problem) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-3xl border bg-white p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Nejdříve vyberte problém
          </h1>
          <p className="mt-3 text-slate-600">
            Pro objednávku opravy potřebujeme vědět, s čím má notebook problém.
          </p>
          <Link
            href="/oprava/krok-1"
            className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white"
          >
            Vybrat problém
          </Link>
        </div>
      </main>
    );
  }

  const selectedProblem = problem;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setErr(null);
    setLoading(true);

    if (!name || !email || !phone || !device || !condition) {
      setErr("Vyplňte prosím jméno, e-mail, telefon, značku/model a stav zařízení.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    form.append("problem", selectedProblem);
    form.append("problemLabel", getProblemLabel(selectedProblem));

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: form,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setErr(data?.error || "Nepodařilo se odeslat objednávku.");
        return;
      }

      router.push(`/oprava/potvrzeni?typ=objednavka&id=${data.orderId}`);
    } catch {
      setErr("Chyba připojení.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/oprava/krok-2" className="text-sm text-slate-600 underline">
        ← Zpět
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight">
              Objednávka opravy
            </h1>

            <p className="mt-3 text-slate-600">
              Problém:{" "}
              <span className="font-semibold text-slate-950">
                {getProblemLabel(selectedProblem)}
              </span>
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">Jméno *</span>
                  <input
                    name="name"
                    required
                    className={inputClass}
                    value={name}
                    onChange={(e) => setContact({ name: e.target.value })}
                    placeholder="Např. Jakub Horák"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">E-mail *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    value={email}
                    onChange={(e) => setContact({ email: e.target.value })}
                    placeholder="např. ja@email.cz"
                  />
                </label>

                <label className="grid gap-1 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Telefon *</span>
                  <input
                    name="phone"
                    required
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setContact({ phone: e.target.value })}
                    placeholder="+420..."
                  />
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Značka a model notebooku *
                </span>
                <input
                  name="device"
                  required
                  className={inputClass}
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  placeholder="Např. Lenovo ThinkPad T14, HP Pavilion, Dell Latitude..."
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Stav zařízení *
                </span>
                <select
                  name="condition"
                  required
                  className={inputClass}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="">Vyberte stav zařízení</option>
                  <option value="Jako nové / bez viditelného poškození">Jako nové / bez viditelného poškození</option>
                  <option value="Běžné známky používání">Běžné známky používání</option>
                  <option value="Lehké škrábance">Lehké škrábance</option>
                  <option value="Viditelné škrábance / oděrky">Viditelné škrábance / oděrky</option>
                  <option value="Praskliny / poškozené šasi">Praskliny / poškozené šasi</option>
                  <option value="Poškozené panty">Poškozené panty</option>
                  <option value="Po polití / známky vlhkosti">Po polití / známky vlhkosti</option>
                  <option value="Silně poškozené / nekompletní">Silně poškozené / nekompletní</option>
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Popis viditelného stavu zařízení
                </span>
                <textarea
                  name="conditionNote"
                  className={`${inputClass} min-h-[100px]`}
                  value={conditionNote}
                  onChange={(e) => setConditionNote(e.target.value)}
                  placeholder="Popište škrábance, praskliny, poškozené rohy, panty, polití apod."
                />
              </label>

              <div className="rounded-2xl border bg-slate-50 p-5">
                <h2 className="font-semibold">Fotky zařízení</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Fotky jsou volitelné, ale doporučené. Ideálně přiložte fotku zavřeného i otevřeného notebooku.
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-slate-700">
                      Fotka zavřeného notebooku
                    </span>

                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFile(e.dataTransfer.files?.[0], "closed");
                      }}
                      className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border px-4 py-4 text-center text-sm font-semibold transition ${
                        photoClosedPreview
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "bg-white text-slate-700 hover:border-black hover:bg-slate-50"
                      }`}
                    >
                      {photoClosedPreview ? (
                        <>
                          <img
                            src={photoClosedPreview}
                            alt="Náhled zavřeného notebooku"
                            className="mb-3 h-24 w-full rounded-lg object-cover"
                          />
                          <span className="break-all text-xs">{photoClosedName}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFile("closed");
                            }}
                            className="mt-2 rounded-lg bg-black px-3 py-1 text-xs text-white"
                          >
                            Odebrat
                          </button>
                        </>
                      ) : (
                        <>
                          📎 Přidat fotku
                          <span className="mt-1 text-xs font-normal text-slate-500">
                            Klikněte nebo přetáhněte soubor sem
                          </span>
                        </>
                      )}

                      <input
                        name="photoClosed"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0], "closed")}
                      />
                    </label>
                  </label>

                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-slate-700">
                      Fotka otevřeného notebooku
                    </span>

                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFile(e.dataTransfer.files?.[0], "open");
                      }}
                      className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border px-4 py-4 text-center text-sm font-semibold transition ${
                        photoOpenPreview
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "bg-white text-slate-700 hover:border-black hover:bg-slate-50"
                      }`}
                    >
                      {photoOpenPreview ? (
                        <>
                          <img
                            src={photoOpenPreview}
                            alt="Náhled otevřeného notebooku"
                            className="mb-3 h-24 w-full rounded-lg object-cover"
                          />
                          <span className="break-all text-xs">{photoOpenName}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFile("open");
                            }}
                            className="mt-2 rounded-lg bg-black px-3 py-1 text-xs text-white"
                          >
                            Odebrat
                          </button>
                        </>
                      ) : (
                        <>
                          📎 Přidat fotku
                          <span className="mt-1 text-xs font-normal text-slate-500">
                            Klikněte nebo přetáhněte soubor sem
                          </span>
                        </>
                      )}

                      <input
                        name="photoOpen"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0], "open")}
                      />
                    </label>
                  </label>
                </div>
              </div>

              <label className="grid gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Poznámka k opravě
                </span>
                <textarea
                  name="note"
                  className={`${inputClass} min-h-[120px]`}
                  value={note}
                  onChange={(e) => setContact({ note: e.target.value })}
                  placeholder="Cokoliv důležitého: projevy závady, historie problému..."
                />
              </label>

              <div className="rounded-2xl border bg-slate-50 p-5 text-sm text-slate-700">
                Odesláním potvrzujete, že uvedené informace odpovídají skutečnému stavu zařízení a souhlasíte s{" "}
                <Link href="/podminky" className="underline">
                  podmínkami služby
                </Link>
                .
              </div>

              {err && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-black/90 disabled:opacity-60"
              >
                {loading ? "Odesílám…" : "Odeslat objednávku"}
              </button>
            </form>
          </div>
        </section>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border bg-slate-50 p-6">
            <h2 className="font-semibold">Proč chceme stav zařízení?</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div>✔ Lepší evidence notebooku</div>
              <div>✔ Méně nedorozumění při převzetí</div>
              <div>✔ Ochrana zákazníka i servisu</div>
              <div>✔ Oprava až po schválení ceny</div>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border bg-white p-6">
            <h2 className="font-semibold">Potřebujete poradit?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Zavolejte nám, pokud si nejste jistí, co vybrat.
            </p>

            <a
              href="tel:+420608711223"
              className="mt-4 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-black/90"
            >
              608 711 223
            </a>
          </div>

          <div className="mt-4 rounded-3xl border bg-white p-6">
            <h2 className="font-semibold">Zaslání notebooku</h2>
            <p className="mt-2 text-sm text-slate-600">
              Po odeslání objednávky vám pošleme e-mail s instrukcemi k zaslání zařízení přes Zásilkovnu / PPL.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}