import { create } from "zustand";

export const useCounterStore = create((set) => ({
  counterGood: 0,
  counterBad: 0,
  counterNeutral: 0,
  actions: {
    incrementGood: () =>
      set((state) => ({ counterGood: state.counterGood + 1 })),
    incrementBad: () => set((state) => ({ counterBad: state.counterBad + 1 })),
    incrementNeutral: () =>
      set((state) => ({ counterNeutral: state.counterNeutral + 1 })),
  },
}));
