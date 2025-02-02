import { create } from "zustand";

type Props = {
  selectedComponent: string;
  setSelectedComponent: (type: string) => void;
};

export const useNavigation = create<Props>((set) => ({
  selectedComponent: "courses",
  setSelectedComponent: (type) => set({ selectedComponent: type }),
}));
