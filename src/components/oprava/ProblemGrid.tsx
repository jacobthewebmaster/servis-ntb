"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { getProblemLabel } from "@/store/orderStore";
import type { ProblemKey } from "@/store/orderStore";

const PROBLEMS: { key: ProblemKey; title: string; desc: string }[] = [
  {
    key: "lcd",
    title: "Prasklý / nefunkční displej",
    desc: "Prasklé sklo, čáry, černá obrazovka",
  },
  {
    key: "charging",
    title: "Nenabíjí / problém s napájením",
    desc: "Nenabíjí se, vypadává konektor, baterie",
  },
  {
    key: "wont_start",
    title: "Nejde zapnout",
    desc: "Notebook nereaguje, nesvítí, nic se neděje",
  },
  {
    key: "overheating",
    title: "Přehřívá se / vypíná se",
    desc: "Hlučný ventilátor, vysoká teplota",
  },
  {
    key: "slow",
    title: "Pomalý / seká se",
    desc: "Dlouhé načítání, zamrzání",
  },
  {
    key: "liquid",
    title: "Po polití / vlhkost",
    desc: "Voda, káva, čaj apod.",
  },
  {
    key: "software",
    title: "Problém se softwarem (Windows)",
    desc: "Chyby, pády, reinstalace",
  },
  {
    key: "other_mechanical",
    title: "Mechanické poškození",
    desc: "Vylomené panty, prasklé šasi, ulomené části",
  },
];

export default function ProblemGrid() {
  const problem = useOrderStore((s) => s.problem);
  const setProblem = useOrderStore((s) => s.setProblem);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROBLEMS.map((p) => {
          const active = problem === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setProblem(p.key)}
              className={[
                "text-left rounded-xl border p-5 transition",
                active
                  ? "bg-blue-50 border-blue-600 ring-2 ring-blue-600"
                  : "bg-white border-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              <div className="font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border p-6">
        <div className="font-semibold">Jiný problém?</div>
        <div className="mt-1 text-sm text-slate-600">
          Nejste si jistí nebo máte kombinaci závad? Popište nám problém a domluvíme se konkrétně.
        </div>
        <div className="mt-4">
          <Link
            href="/oprava/kontakt"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-2 font-semibold"
          >
            Popsat problém
          </Link>
        </div>
      </div>

      {/* debug – klidně pak smaž */}
      <div className="text-sm text-slate-600">
        Vybráno:{" "}
        <span className="font-semibold">
          {problem ? getProblemLabel(problem) : "nic"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Pokud si nejste jistí, vyberte možnost, která je nejblíž vašemu problému.
        </p>
        <Link
          href={problem ? "/oprava/krok-2" : "#"}
          className={[
            "inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold",
            !problem && "pointer-events-none opacity-50",
          ].join(" ")}
        >
          Pokračovat
        </Link>
      </div>
    </div>
  );
}
