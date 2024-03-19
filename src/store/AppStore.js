import  create  from "zustand";
import "../styles/App.css"
export const useAppStore = create((set) => ({
  isLightMode: true,
  setIsLightMode: (theme) => set({ isLightMode: theme }),
}));