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

  orderId: string | null;
  ensureOrderId: () => void;

  paid: boolean;
  setPaid: (v: boolean) => void;

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

  paid: false,
  setPaid: (paid) => set({ paid }),

  reset: () => set({ problem: null, shipping: null, orderId: null, paid: false }),
}));
