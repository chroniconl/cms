import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PostTitleInput from './PostTitleInput'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  global.fetch = jest.fn()
})

const document = {
  id: '123',
  title: 'Example Title',
}

describe('PostTitleInput', () => {
  describe('Input Rendering', () => {
    it('renders without a placeholder if no title is provided', async () => {
      const { getByPlaceholderText } = render(
        <PostTitleInput postId={document.id} />,
      )

      // Initial Render (No Title): Verify the component renders correctly with the placeholder text
      expect(getByPlaceholderText('Enter a title')).toBeInTheDocument()
    })

    it('renders with a title if one is provided', async () => {
      const { getByPlaceholderText, getByDisplayValue } = render(
        <PostTitleInput postId={document.id} value="My Title" />,
      )

      // Initial Render (With Title): Verify the component renders correctly with the provided title
      expect(getByPlaceholderText('Enter a title')).toBeInTheDocument()
      expect(getByDisplayValue('My Title')).toBeInTheDocument()
    })
  })
})
