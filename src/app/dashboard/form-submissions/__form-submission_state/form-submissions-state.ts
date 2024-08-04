import { create } from 'zustand'

interface FormSubmission {
	id: number
	email: string
	name: string
	message: string
	phone: string
	status: string
	date: string
}

export const useFormSubmissionsStore = create<{
	formSubmissions: FormSubmission[]
	setFormSubmissions: (formSubmissions: FormSubmission[]) => void
}>((set) => ({
	formSubmissions: [],
	setFormSubmissions: (formSubmissions: FormSubmission[]) =>
		set({ formSubmissions }),
}))
