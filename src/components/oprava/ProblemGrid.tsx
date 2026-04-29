"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import type { ProblemKey } from "@/store/orderStore";

const PROBLEMS: { key: ProblemKey; icon: string; title: string; desc: string }[] = [
  { key: "lcd", icon: "💻", title: "Prasklý / nefunkční displej", desc: "Prasklé sklo, čáry, černá obrazovka" },
  { key: "charging", icon: "🔌", title: "Nenabíjí / problém s napájením", desc: "Nenabíjí se, vypadává konektor, baterie" },
  { key: "wont_start", icon: "⏻", title: "Nejde zapnout", desc: "Notebook nereaguje, nesvítí, nic se neděje" },
  { key: "overheating", icon: "🌡️", title: "Přehřívá se / vypíná se", desc: "Hlučný ventilátor, vysoká teplota" },
  { key: "slow", icon: "🐢", title: "Pomalý / seká se", desc: "Dlouhé načítání, zamrzání" },
  { key: "liquid", icon: "💧", title: "Po polití / vlhkost", desc: "Voda, káva, čaj apod." },
  { key: "software", icon: "⚙️", title: "Problém se softwarem (Windows)", desc: "Chyby, pády, reinstalace" },
  { key: "other_mechanical", icon: "🔧", title: "Mechanické poškození", desc: "Vylomené panty, prasklé šasi, ulomené části" },
  { key: "other", icon: "❓", title: "Jiný problém", desc: "Popište závadu vlastními slovy" },
];

export default function ProblemGrid() {
  const problem = useOrderStore((s) => s.problem);
  const setProblem = useOrderStore((s) => s.setProblem);

  return (
    <div className="space-y-8">
      
      {/* 🔥 TADY JEDINÁ ZMĚNA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROBLEMS.map((p) => {
          const active = problem === p.key;

          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setProblem(p.key)}
              className={[
                "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition",
                active
                  ? "border-black bg-slate-50 ring-2 ring-black"
                  : "border-slate-200 bg-white hover:border-black hover:bg-slate-50",
              ].join(" ")}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl">
                {p.icon}
              </div>

              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Pokud si nejste jistí, vyberte možnost, která je nejblíž vašemu problému.
        </p>

        <Link
          href={problem ? "/oprava/krok-2" : "#"}
          className={[
            "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold",
            problem
              ? "bg-black text-white hover:bg-black/90"
              : "pointer-events-none bg-slate-200 text-slate-500",
          ].join(" ")}
        >
          Pokračovat
        </Link>
      </div>
    </div>
  );
}