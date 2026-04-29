"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";

const services = [
  {
    key: "lcd",
    icon: "🖥️",
    title: "Výměna displeje",
    text: "Prasklé nebo nefunkční displeje vyměníme rychle a spolehlivě.",
  },
  {
    key: "charging",
    icon: "🔌",
    title: "Oprava napájení / USB‑C",
    text: "Řešíme nenabíjení, vadné konektory a problémy s napájením.",
  },
  {
    key: "overheating",
    icon: "🌡️",
    title: "Čištění chlazení",
    text: "Vyčistíme chlazení, přepastujeme a snížíme teploty notebooku.",
  },
  {
    key: "other_mechanical",
    icon: "⚙️",
    title: "Oprava základní desky",
    text: "Diagnostika a opravy závad na desce podle rozsahu poškození.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const setProblem = useOrderStore((s) => s.setProblem);

  function handleClick(key: string) {
    setProblem(key as any);
    router.push("/oprava/krok-2");
  }

  return (
    <main className="min-h-screen text-slate-950">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="font-bold">💻 NotebookServis</div>

          <div className="text-right">
            <a href="tel:+420608711223" className="block text-sm font-semibold text-slate-700 hover:text-black">
              📞 608 711 223
            </a>
            <a href="mailto:tadybudeemailazhovytvoris@hvshop.cz" className="block text-xs text-slate-500 hover:text-black">
              tadybudeemailazhovytvoris@hvshop.cz
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 inline-flex rounded-full border bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm">
          Servis notebooků všech běžných značek
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          Opravy notebooků rychle a bez starostí
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Diagnostika zdarma při realizaci opravy. Opravu provádíme až po vašem schválení ceny.
        </p>

        <div className="mt-8">
          <Link
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-black px-12 py-6 text-xl font-bold text-white shadow-xl transition hover:scale-105 hover:bg-black/90 active:scale-95"
          >
            🚀 Začít opravu
          </Link>
        </div>
      </section>

      <section className="border-y bg-white/55 backdrop-blur">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 py-10 sm:grid-cols-3">
          {[
            ["Diagnostika zdarma", "Při realizaci opravy diagnostiku neúčtujeme."],
            ["Oprava až po schválení", "Nejdřív vám řekneme cenu, opravujeme až po souhlasu."],
            ["Doprava zpět zdarma", "Při realizaci opravy posíláme notebook zpět zdarma."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border bg-white/90 p-5 shadow-sm">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Naše služby</h2>
          <p className="mt-3 text-slate-600">
            Klikněte na problém a pokračujte v objednávce.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <button
              key={s.title}
              onClick={() => handleClick(s.key)}
              className="flex w-full cursor-pointer gap-5 rounded-3xl border bg-white/80 p-6 text-left shadow-sm transition hover:scale-[1.02] hover:border-black hover:bg-white hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                {s.icon}
              </div>

              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </div>
            </button>
          ))}

          <Link
            href="/oprava/krok-1"
            className="flex w-full cursor-pointer gap-5 rounded-3xl border bg-white/80 p-6 text-left shadow-sm transition hover:scale-[1.02] hover:border-black hover:bg-white hover:shadow-md sm:col-span-2"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
              ❓
            </div>

            <div>
              <h3 className="font-semibold">Jiný problém</h3>
              <p className="mt-2 text-sm text-slate-600">
                Nejste si jistí? Vyberte problém z kompletního seznamu.
              </p>
            </div>
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Apple zařízení neopravujeme.
        </p>
      </section>

      <section className="border-y bg-white/55 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Jak to funguje</h2>
          <p className="mt-3 text-slate-600">
            Jednoduchý proces od objednávky po opravený notebook.
          </p>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-slate-300 lg:block" />

            <div className="grid gap-10 lg:grid-cols-4">
              {[
                ["📝", "Vyplníte formulář", "Vyberete problém a doplníte údaje"],
                ["📦", "Pošlete notebook", "Zabalíte a odešlete zařízení"],
                ["🔍", "Diagnostika zdarma", "Do 24h vám sdělíme cenu"],
                ["✅", "Opravíme a pošleme", "Po schválení opravíme a vrátíme"],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-white text-2xl shadow-sm">
                    {icon}
                  </div>

                  <h3 className="mt-6 font-semibold">{title}</h3>
                  <p className="mt-2 max-w-[180px] text-sm text-slate-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border bg-white/90 p-8 text-center shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight">
            Proč nám notebook svěřit?
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "✔ Oprava až po schválení ceny",
              "✔ Bez platby předem",
              "✔ Rychlá komunikace",
              "✔ Telefonická podpora",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-5 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Připraveni vám pomoci
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Nevíte si rady? Vyplňte krátký formulář a my se vám ozveme s dalším postupem.
        </p>

        <Link
          href="/oprava/krok-1"
          className="mt-8 inline-flex rounded-2xl bg-black px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-black/90"
        >
          Začít opravu →
        </Link>
      </section>
    </main>
  );
}