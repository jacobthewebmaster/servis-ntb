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

/** České názvy pro UI (aby se nikde neukázalo "liquid") */
export const PROBLEM_LABELS: Record<ProblemKey, string> = {
  lcd: "Prasklý / nefunkční displej",
  charging: "Nenabíjí / problém s napájením",
  wont_start: "Nejde zapnout",
  overheating: "Přehřívá se / vypíná se",
  slow: "Pomalý / seká se",
  liquid: "Po polití / vlhkost",
  software: "Problém se softwarem (Windows)",
  other_mechanical: "Mechanické poškození",
};

export function getProblemLabel(key: ProblemKey | null) {
  return key ? PROBLEM_LABELS[key] : "";
}

type OrderState = {
  problem: ProblemKey | null;
  setProblem: (p: ProblemKey) => void;

  shipping: ShippingMethod;
  setShipping: (m: ShippingMethod) => void;

  orderId: string | null;
  ensureOrderId: () => void;

  reset: () => void;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),

  shipping: null,
  setShipping: (shipping) => set({ shipping }),

  orderId: null,
  ensureOrderId: () => {
    if (!get().orderId) {
      const id = "ORD-" + Date.now().toString(36).toUpperCase();
      set({ orderId: id });
    }
  },

  reset: () => set({ problem: null, shipping: null, orderId: null }),
}));
