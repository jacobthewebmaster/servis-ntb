"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";

const services = [
  {
    key: "lcd",
    icon: "🖥️",
    title: "Výměna displeje notebooku",
    text: "Prasklý nebo nefunkční displej notebooku vyměníme rychle a spolehlivě.",
  },
  {
    key: "charging",
    icon: "🔌",
    title: "Oprava napájení / USB‑C",
    text: "Řešíme nenabíjení notebooku, vadné konektory a problémy s napájením.",
  },
  {
    key: "overheating",
    icon: "🌡️",
    title: "Čištění chlazení notebooku",
    text: "Vyčistíme chlazení, přepastujeme procesor a snížíme teploty notebooku.",
  },
  {
    key: "other_mechanical",
    icon: "⚙️",
    title: "Oprava základní desky notebooku",
    text: "Provádíme diagnostiku a opravy závad na základní desce notebooku.",
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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center text-base font-bold leading-none">
            <div className="flex overflow-hidden rounded-md">
              <span className="bg-blue-600 px-3 py-1.5 font-black text-white">
                HV
              </span>
              <span className="bg-green-600 px-4 py-1.5 font-bold text-white">
                notebooky
              </span>
            </div>

            <span className="ml-1 text-base font-bold text-slate-700">
              .cz
            </span>
          </div>

          <div className="text-right">
            <a
              href="tel:+420774506503"
              className="block text-sm font-semibold text-slate-800 hover:text-blue-700"
            >
              📞 774 506 503
            </a>
            <a
              href="mailto:ntbservis@hvshop.cz"
              className="block text-xs text-slate-500 hover:text-blue-700"
            >
              ntbservis@hvshop.cz
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 inline-flex rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
          Servis notebooků po celé ČR
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
          Opravy notebooků rychle a bez starostí
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Provádíme servis a opravy notebooků běžných značek jako Lenovo, HP,
          Dell, Asus, Acer a další. Diagnostika zdarma při realizaci opravy.
          Opravujeme až po vašem schválení ceny.
        </p>

        <div className="mt-8">
          <Link
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-700 px-12 py-6 text-xl font-bold text-white shadow-xl shadow-red-300 transition hover:scale-105 hover:bg-red-800 active:scale-95"
          >
            🚀 Začít opravu
          </Link>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          ✔ Nezávazně • ✔ Odpověď do 24 hodin • ✔ Oprava až po schválení ceny
        </p>
      </section>

      <section className="border-y border-blue-100 bg-white/70 backdrop-blur">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 py-10 sm:grid-cols-3">
          {[
            ["Diagnostika zdarma", "Při realizaci opravy diagnostiku neúčtujeme."],
            ["Oprava až po schválení", "Nejdřív vám řekneme cenu, opravujeme až po souhlasu."],
            ["Doprava zpět zdarma", "Při realizaci opravy posíláme notebook zpět zdarma."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <h3 className="font-bold text-blue-800">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight">
            Nejčastější opravy notebooků
          </h2>
          <p className="mt-3 text-slate-600">
            Vyberte problém s notebookem a pokračujte v objednávce opravy.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <button
              key={s.title}
              onClick={() => handleClick(s.key)}
              className="flex w-full cursor-pointer gap-5 rounded-3xl border border-blue-100 bg-white p-6 text-left shadow-sm transition hover:scale-[1.02] hover:border-blue-600 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                {s.icon}
              </div>

              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </div>
            </button>
          ))}

          <Link
            href="/oprava/krok-1"
            className="flex w-full cursor-pointer gap-5 rounded-3xl border border-red-200 bg-red-50 p-6 text-left shadow-sm transition hover:scale-[1.02] hover:border-red-700 hover:bg-white hover:shadow-md sm:col-span-2"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl">
              ❓
            </div>

            <div>
              <h3 className="font-bold">Jiný problém s notebookem</h3>
              <p className="mt-2 text-sm text-slate-600">
                Nejste si jistí závadou? Vyberte problém z kompletního seznamu
                a popište nám, co notebook dělá.
              </p>
            </div>
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Apple zařízení neopravujeme.
        </p>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-black tracking-tight">
            Jak probíhá oprava notebooku?
          </h2>

          <p className="mt-3 text-slate-600">
            Jednoduchý proces od objednávky po opravený notebook.
          </p>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-8 z-0 hidden h-px bg-blue-300 lg:block" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-4">
              {[
                ["📝", "Vyplníte formulář", "Vyberete problém a doplníte údaje"],
                ["📦", "Pošlete notebook", "Zabalíte a odešlete zařízení"],
                ["🔍", "Diagnostika zdarma", "Do 24h vám sdělíme cenu"],
                ["✅", "Opravíme a pošleme", "Po schválení opravíme a vrátíme"],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-700 bg-white text-2xl shadow-sm">
                    {icon}
                  </div>

                  <h3 className="mt-6 font-bold">{title}</h3>
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
        <div className="rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-3xl font-black tracking-tight">
            Servis notebooků pro zákazníky z celé České republiky
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            Notebook nám můžete zaslat přes dopravce. Po přijetí zařízení
            provedeme diagnostiku, sdělíme vám cenu opravy a do opravy se
            pustíme až po vašem potvrzení.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "✔ Oprava až po schválení ceny",
              "✔ Bez platby předem",
              "✔ Rychlá komunikace",
              "✔ Telefonická podpora",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-blue-50 p-5 text-sm font-bold text-blue-900"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/80">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-3xl font-black tracking-tight">
            Časté dotazy k opravě notebooku
          </h2>

          <div className="mt-10 grid gap-4">
            {[
              [
                "Kolik stojí oprava notebooku?",
                "Cena záleží na typu závady a modelu notebooku. Nejprve provedeme diagnostiku a cenu vám sdělíme před opravou.",
              ],
              [
                "Platím něco předem?",
                "Ne. Opravu provádíme až po vašem schválení ceny.",
              ],
              [
                "Jak rychle se ozvete?",
                "Po odeslání formuláře se vám ozveme obvykle do 24 hodin.",
              ],
              [
                "Opravujete všechny značky notebooků?",
                "Opravujeme běžné značky jako Lenovo, HP, Dell, Asus, Acer a další. Apple zařízení neopravujeme.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-blue-100 bg-white p-5">
                <h3 className="font-bold text-blue-900">{q}</h3>
                <p className="mt-2 text-sm text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-black tracking-tight">
          Potřebujete opravit notebook?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Vyplňte krátký formulář a my se vám ozveme s dalším postupem.
          Pomůžeme s výměnou displeje, opravou napájení, čištěním chlazení i
          diagnostikou závady.
        </p>

        <Link
          href="/oprava/krok-1"
          className="mt-8 inline-flex rounded-2xl bg-red-700 px-8 py-4 font-bold text-white shadow-lg shadow-red-300 transition hover:scale-105 hover:bg-red-800"
        >
          Začít opravu →
        </Link>
      </section>

      <footer className="border-t border-blue-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">
            HVnotebooky.cz – servis a opravy notebooků
          </p>
          <p className="mt-2">
            Telefon:{" "}
            <a href="tel:+420774506503" className="font-semibold text-blue-700 underline">
              774 506 503
            </a>{" "}
            • E-mail:{" "}
            <a href="mailto:ntbservis@hvshop.cz" className="font-semibold text-blue-700 underline">
              ntbservis@hvshop.cz
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}