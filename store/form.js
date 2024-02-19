import { create } from "zustand";

export const useFormStore = create((set) => ({
  months: 0,
  capital: 0,
  tae: 0,
  startDate: new Date().toISOString().substring(0, 10),
  vpaAmount: 0,
  vpaInterval: 0,
  currentEuribor: 0,
  setMonths: (months) => set({ months }),
  setCapital: (capital) => set({ capital }),
  setTae: (tae) => set({ tae: Number(tae) }),
  setStartDate: (startDate) => set({ startDate }),
  setVpaAmount: (vpaAmount) => set({ vpaAmount }),
  setVpaInterval: (vpaInterval) => set({ vpaInterval }),
  setCurrentEuribor: (currentEuribor) => set({ currentEuribor }),
}));
