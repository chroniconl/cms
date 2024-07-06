import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MetaForm from '../src/app/dashboard/posts/[slug]/edit/_edit_components/MetaForm'
import { useMetaFormStore } from '../src/app/dashboard/posts/[slug]/edit/_edit_state/metaFormStore'
import { parseISO } from 'date-fns'

// Mock the zustand store
jest.mock(
	'../src/app/dashboard/posts/[slug]/edit/_edit_state/metaFormStore',
	() => ({
		useMetaFormStore: jest.fn(),
	}),
)

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ test: 100 }),
	}),
)

describe('MetaForm', () => {
	it('renders without error', () => {
		// Mock the state and methods from the zustand store
		useMetaFormStore.mockReturnValue({
			categories: [],
			setCategories: jest.fn(),
			setPublishDate: jest.fn(),
			publishDate: '',
			setCreatedAt: jest.fn(),
			createdAt: '',
			setVisibility: jest.fn(),
			setCurrentCategory: jest.fn(),
		})

		const props = {
			id: 'test-id',
			visibility: 'public',
			description: 'Test description',
			createdAt: parseISO('2024-05-12T13:28:05.612908+00'),
			publishDate: parseISO('2024-05-12T13:28:05.612908+00'),
			currentCategory: { id: '1', name: 'Test Category' },
		}

		render(<MetaForm {...props} />)

		// Check if the form is in the document
		const form = screen.getByRole('form')
		expect(form).toBeInTheDocument()
	})
})
