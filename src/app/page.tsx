// src/app/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore, type ProblemKey } from "@/store/orderStore";

const services: { key: ProblemKey; icon: string; title: string; text: string }[] = [
  {
    key: "lcd",
    icon: "🖥️",
    title: "Výměna displeje notebooku",
    text: "Prasklý, flekatý nebo nefunkční displej vyměníme rychle a kvalitně.",
  },
  {
    key: "charging",
    icon: "🔌",
    title: "Oprava napájení / USB-C",
    text: "Nenabíjí se? Vadný konektor? Řešíme to u všech běžných značek.",
  },
  {
    key: "overheating",
    icon: "🌡️",
    title: "Čištění chlazení + přepastování",
    text: "Přehřívání, hlučný ventilátor — kompletní servis chlazení.",
  },
  {
    key: "other_mechanical",
    icon: "⚙️",
    title: "Oprava základní desky",
    text: "Diagnostika a opravy složitějších závad.",
  },
];

export default function HomePage() {
  const router = useRouter();
  const setProblem = useOrderStore((s) => s.setProblem);

  const handleServiceClick = (key: ProblemKey) => {
    setProblem(key);
    router.push("/oprava/krok-2");
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-xl font-black text-2xl">
              <span className="bg-blue-600 px-3 py-1 text-white">HV</span>
              <span className="bg-emerald-600 px-3 py-1 text-white">NOTEBOOKY</span>
            </div>
            <span className="text-xl font-bold text-slate-700">.cz</span>
          </div>

          <div className="flex flex-col items-end">
            <a href="tel:+420774506503" className="font-semibold text-lg hover:text-emerald-600 transition">
              📞 774 506 503
            </a>
            <a href="mailto:ntbservis@hvshop.cz" className="text-sm text-slate-600 hover:text-emerald-600 transition">
              ntbservis@hvshop.cz
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700">
          Opravy notebooků po celé České republice
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl md:text-6xl font-black tracking-tighter leading-[1.1]">
          Pošlete nám notebook<br />
          <span className="text-emerald-600">odkudkoli z ČR</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
          Profesionální opravy notebooků všech běžných značek. 
          Diagnostika zdarma, transparentní cena předem, oprava až po vašem schválení.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/oprava/krok-1"
            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-10 py-6 text-2xl font-bold text-white shadow-xl shadow-red-300/50 hover:bg-red-700 hover:scale-105 transition-all"
          >
            Začít objednávku opravy →
          </Link>

          <a
            href="tel:+420774506503"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-800 px-8 py-6 text-xl font-semibold hover:bg-slate-900 hover:text-white transition"
          >
            📞 Zavolat hned
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          ✓ Nezávazné • ✓ Odpověď do 24 hodin • ✓ Doprava zpět zdarma při opravě
        </p>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-10 text-center">
          {[
            ["Diagnostika zdarma", "Při realizaci opravy"],
            ["Oprava až po schválení", "Transparentní ceny"],
            ["Doprava zpět zdarma", "Po celé ČR"],
          ].map(([title, subtitle]) => (
            <div key={title} className="flex flex-col items-center">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-slate-600">{subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SLUŽBY */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tight">Nejčastější opravy</h2>
          <p className="mt-3 text-lg text-slate-600">
            Klikněte na váš problém a pokračujte v objednávce
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => handleServiceClick(service.key)}
              className="group flex gap-6 rounded-3xl border border-slate-200 p-8 text-left hover:border-emerald-600 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="text-5xl transition-transform group-hover:scale-110">
                {service.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.text}</p>
              </div>
            </button>
          ))}

          <Link
            href="/oprava/krok-1"
            className="md:col-span-2 group flex gap-6 rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-8 text-left hover:border-red-600 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="text-5xl">❓</div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Mám jiný problém</h3>
              <p className="text-slate-600 text-lg">
                Nevidíte svou závadu? Popište nám ji a my vám poradíme.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* PROCES */}
      <section className="bg-slate-900 text-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black">Jak to probíhá?</h2>
            <p className="mt-4 text-xl text-slate-400">
              4 jednoduché kroky od objednávky po opravený notebook
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              ["1️⃣", "Vyplníte formulář", "Popíšete problém a zašlete kontaktní údaje"],
              ["2️⃣", "Pošlete notebook", "Zabalíte a odešlete přes dopravce (PPL, Zásilkovna…)"],
              ["3️⃣", "Diagnostika + cena", "Do 24 hodin vám sdělíme cenu opravy"],
              ["4️⃣", "Oprava a vrácení", "Po vašem souhlasu opravíme a pošleme zpět zdarma"],
            ].map(([icon, title, desc]) => (
              <div key={title} className="text-center">
                <div className="text-6xl mb-6">{icon}</div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* === RECENZE - POSOUVACÍ KARUSEL (BEZ PROFILOVÝCH OBRÁZKŮ) === */}
<section className="mx-auto max-w-6xl px-6 py-20 bg-slate-50">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-black tracking-tight">Co říkají naši zákazníci</h2>
    <p className="mt-3 text-lg text-slate-600">Přes 340 opravených notebooků za poslední rok</p>
  </div>

  <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8">
    
    {/* Recenze 1 */}
    <div className="min-w-[360px] snap-start bg-white rounded-3xl p-8 shadow-sm flex-shrink-0">
      <div className="flex text-yellow-400 mb-4">★★★★★</div>
      <p className="text-slate-700">"Displej mi praskl po pádu. Poslal jsem notebook v pondělí a ve čtvrtek už byl zpátky jako nový. Cena přesně podle nabídky, komunikace super."</p>
      <div className="mt-8">
        <p className="font-semibold">Martin Dvořák</p>
        <p className="text-sm text-slate-500">Brno</p>
      </div>
    </div>

    {/* Recenze 2 */}
    <div className="min-w-[360px] snap-start bg-white rounded-3xl p-8 shadow-sm flex-shrink-0">
      <div className="flex text-yellow-400 mb-4">★★★★★</div>
      <p className="text-slate-700">"Notebook se přehříval a byl hlučný. Vyčistili chlazení a přepastovali. Teď běží tiše a chladně. Výborná práce!"</p>
      <div className="mt-8">
        <p className="font-semibold">Lucie Kovářová</p>
        <p className="text-sm text-slate-500">Praha</p>
      </div>
    </div>

    {/* Recenze 3 */}
    <div className="min-w-[360px] snap-start bg-white rounded-3xl p-8 shadow-sm flex-shrink-0">
      <div className="flex text-yellow-400 mb-4">★★★★★</div>
      <p className="text-slate-700">"Výměna klávesnice + napájení. Vše fungovalo na první dobrou. Super cena a hlavně – opravili to až po mém souhlasu."</p>
      <div className="mt-8">
        <p className="font-semibold">Petr Novotný</p>
        <p className="text-sm text-slate-500">Ostrava</p>
      </div>
    </div>

    {/* Recenze 4 */}
    <div className="min-w-[360px] snap-start bg-white rounded-3xl p-8 shadow-sm flex-shrink-0">
      <div className="flex text-yellow-400 mb-4">★★★★★</div>
      <p className="text-slate-700">"Nejlepší servis, jaký jsem kdy měl. Zachránili mi notebook, který jsem už chtěl vyhodit. Velmi profesionální přístup."</p>
      <div className="mt-8">
        <p className="font-semibold">Tomáš Marek</p>
        <p className="text-sm text-slate-500">Liberec</p>
      </div>
    </div>

    {/* Recenze 5 */}
    <div className="min-w-[360px] snap-start bg-white rounded-3xl p-8 shadow-sm flex-shrink-0">
      <div className="flex text-yellow-400 mb-4">★★★★★</div>
      <p className="text-slate-700">"Čištění + výměna SSD. Služba na úrovni. Poslala jsem přes Zásilkovnu a za 4 dny měl notebook zpátky. Doporučuji všem."</p>
      <div className="mt-8">
        <p className="font-semibold">Veronika Hájková</p>
        <p className="text-sm text-slate-500">Hradec Králové</p>
      </div>
    </div>

    {/* Recenze 6 */}
    <div className="min-w-[360px] snap-start bg-white rounded-3xl p-8 shadow-sm flex-shrink-0">
      <div className="flex text-yellow-400 mb-4">★★★★★</div>
      <p className="text-slate-700">"Opravili mi USB-C port. Rychlé, levné a hlavně – vše transparentní. Budu se vracet."</p>
      <div className="mt-8">
        <p className="font-semibold">David Beneš</p>
        <p className="text-sm text-slate-500">Olomouc</p>
      </div>
    </div>

  </div>
</section>

      {/* FAQ + FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-4xl font-black text-center mb-12">Často se ptáte</h2>

        <div className="space-y-6">
          {[
            ["Kolik stojí oprava?", "Cena závisí na modelu a typu závady. Nejprve provedeme diagnostiku a cenu vám sdělíme před opravou."],
            ["Musím platit předem?", "Ne. Platíte až po schválení ceny opravy."],
            ["Jak rychle se ozvete?", "Po odeslání formuláře se vám ozveme obvykle do 24 hodin."],
            ["Opravujete všechny značky?", "Ano — Lenovo, HP, Dell, Asus, Acer a další. Apple zařízení neopravujeme."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-slate-200 p-8">
              <h3 className="font-bold text-xl mb-3">{q}</h3>
              <p className="text-slate-600">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Připraveni poslat notebook?</h3>
          <Link
            href="/oprava/krok-1"
            className="inline-block rounded-2xl bg-red-600 px-12 py-6 text-2xl font-bold text-white hover:bg-red-700 transition"
          >
            Začít objednávku →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center text-slate-500">
          <p className="font-semibold text-slate-700">
            HV Notebooky.cz — Profesionální servis notebooků
          </p>
          <p className="mt-3">
            Tel: <a href="tel:+420774506503" className="hover:text-slate-800">774 506 503</a> • 
            Email: <a href="mailto:ntbservis@hvshop.cz" className="hover:text-slate-800">ntbservis@hvshop.cz</a>
          </p>
          <p className="mt-6 text-xs">© 2026 HV Notebooky. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </main>
  );
}