import { create } from "zustand";
import { Category } from "./types";

export const useCategoriesStore = create<{
  categories: any[];
  setCategories: (categories: Category[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
}));
