import { create } from "zustand";

export type ProblemKey =
  | "lcd"
  | "charging"
  | "wont_start"
  | "overheating"
  | "slow"
  | "liquid"
  | "software"
  | "other_mechanical"
  | "other";

type OrderState = {
  problem: ProblemKey | null;
  setProblem: (p: ProblemKey) => void;

  name: string;
  email: string;
  phone: string;
  note: string;

  setContact: (
    v: Partial<Pick<OrderState, "name" | "email" | "phone" | "note">>
  ) => void;

  reset: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),

  name: "",
  email: "",
  phone: "",
  note: "",

  setContact: (v) =>
    set((state) => ({
      ...state,
      ...v,
    })),

  reset: () =>
    set({
      problem: null,
      name: "",
      email: "",
      phone: "",
      note: "",
    }),
}));

export function getProblemLabel(p: ProblemKey | null) {
  if (!p) return "";

  const labels: Record<ProblemKey, string> = {
    lcd: "Prasklý / nefunkční displej",
    charging: "Nenabíjí / problém s napájením",
    wont_start: "Nejde zapnout",
    overheating: "Přehřívá se / vypíná se",
    slow: "Pomalý / seká se",
    liquid: "Po polití / vlhkost",
    software: "Problém se softwarem",
    other_mechanical: "Mechanické poškození",
    other: "Jiný problém",
  };

  return labels[p];
}