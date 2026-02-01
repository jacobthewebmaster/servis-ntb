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

  shipping: ShippingMethod;
  setShipping: (m: ShippingMethod) => void;

  reset: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  problem: null,
  setProblem: (problem) => set({ problem }),

  shipping: null,
  setShipping: (shipping) => set({ shipping }),

  reset: () => set({ problem: null, shipping: null }),
}));
