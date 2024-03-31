import  create  from "zustand";
export const useAppStore = create((set) => ({
  isLightMode: true,
  setIsLightMode: (theme) => set({ isLightMode: theme }),
}));