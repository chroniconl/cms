import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PostDescriptionTextarea from './PostDescriptionTextarea'
import userEvent from '@testing-library/user-event'

const document = {
  id: '123',
  title: 'Example Title',
}

describe('PostDescriptionTextarea', () => {
  describe('Textarea Rendering', () => {
    it('renders without a placeholder if no description is provided', async () => {
      const { getByPlaceholderText } = render(
        <PostDescriptionTextarea postId={document.id} />,
      )

      // Initial Render (No Description): Verify the component renders correctly with the placeholder text
      expect(getByPlaceholderText('Enter a description')).toBeInTheDocument()
    })

    it('renders with a description if one is provided', async () => {
      const { getByPlaceholderText, getByText } = render(
        <PostDescriptionTextarea postId={document.id} value="My Description" />,
      )

      // Initial Render (With Description): Verify the component renders correctly with the provided description
      expect(getByPlaceholderText('Enter a description')).toBeInTheDocument()
      expect(getByText('My Description')).toBeInTheDocument()
    })
  })
})
