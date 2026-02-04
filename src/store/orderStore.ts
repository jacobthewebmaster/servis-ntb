import { create } from "zustand";

export type ProblemKey =
  | "lcd"
  | "charging"
  | "wont_start"
  | "overheating"
  | "slow"
  | "liquid"
  | "software"
  | "other_mechanical";

export type ShippingMethod = "zasilkovna" | "kuryr" | "osobne" | null;

type OrderState = {
  problem: ProblemKey | null;
  setProblem: (p: ProblemKey) => void;

  // kontakty
  name: string;
  email: string;
  phone: string;
  note: string;
  setContact: (v: Partial<Pick<OrderState, "name" | "email" | "phone" | "note">>) => void;

  shipping: ShippingMethod;
  setShipping: (m: ShippingMethod) => void;

  reset: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),

  name: "",
  email: "",
  phone: "",
  note: "",
  setContact: (v) => set(v),

  shipping: null,
  setShipping: (shipping) => set({ shipping }),

  reset: () =>
    set({
      problem: null,
      name: "",
      email: "",
      phone: "",
      note: "",
      shipping: null,
    }),
}));
export function getProblemLabel(p: ProblemKey | null) {
  if (!p) return "";
  return {
    lcd: "Prasklý / nefunkční displej",
    charging: "Nenabíjí / problém s napájením",
    wont_start: "Nejde zapnout",
    overheating: "Přehřívá se / vypíná se",
    slow: "Pomalý / seká se",
    liquid: "Po polití / vlhkost",
    software: "Problém se softwarem",
    other_mechanical: "Mechanické poškození",
  }[p];
}