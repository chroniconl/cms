import { Category } from "@/utils/types";
import { create } from "zustand";

export interface MetaFormState {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	
	publishDate: Date;
	setPublishDate: (publishDate: Date) => void;
	
	createdAt: Date;
	setCreatedAt: (createdAt: Date) => void;

	visibility: string;
	setVisibility: (visibility: string) => void;
	
	tags: string;
	setTags: (tags: string) => void;
	
	description: string;
	setDescription: (description: string) => void;
	
	currentCategory: string;
	setCurrentCategory: (currentCategory: string) => void;
}

export const useMetaFormStore = create<MetaFormState>((set) => ({
	categories: [],
	setCategories: (categories: Category[]) => set({ categories }),

	publishDate: new Date(),
	setPublishDate: (publishDate: Date) => set({ publishDate }),
	
	createdAt: new Date(),
	setCreatedAt: (createdAt: Date) => set({ createdAt }),

	visibility: '',
	setVisibility: (visibility: string) => set({ visibility }),

	tags: '',
	setTags: (tags: string) => set({ tags }),

	description: '',
	setDescription: (description: string) => set({ description }),

	currentCategory: '',
	setCurrentCategory: (currentCategory: string) => set({ currentCategory }),
}));