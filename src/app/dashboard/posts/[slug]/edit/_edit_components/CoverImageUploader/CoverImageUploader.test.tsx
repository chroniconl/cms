import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ImageForm from './CoverImageUploader'
import { useMetaFormStore } from '../../_edit_state/metaFormStore'
import userEvent from '@testing-library/user-event'
import { Toaster } from '@/components/ui/toaster'

// When uploading an image in this context,
// there will be an document ID and an document title
// we use the document title as the image alt text
const document = {
  id: '123',
  title: 'Example Title',
}

const testImage = {
  id: '456',
  url:
    process.env.SUPABASE_STORAGE_BUCKET_URL +
    '/fabian-gieske-cbIKeuURaq8-unsplash.png',
}

describe('ImageForm', () => {
  describe('Image Rendering', () => {
    it('renders without an image initially', async () => {
      const { getByText } = await render(
        <ImageForm
          documentId={document.id}
          imageUrl={null}
          imageId={null}
          imageAlt={document.title}
        />,
      )

      // Initial Render (No Image): Verify the component renders correctly with the FileUploader visible and no image displayed when no image URL is provided.
      expect(getByText('Drag & drop an image here')).toBeInTheDocument()
    })

    it('renders with an image initially', async () => {
      const { getByAltText, getByLabelText } = await render(
        <ImageForm
          documentId={document.id}
          imageUrl={testImage.url}
          imageId={testImage.id}
          imageAlt={document.title}
        />,
      )

      // Alt Text and Caption: Verify the imageAlt prop is used correctly. This can be done by checking if the alt attribute of the Image component matches the value passed as imageAlt in the props.
      // Initial Render (With Image): Verify the component renders the Image component correctly, showing the provided image URL and the delete button when an image URL exists.
      expect(getByAltText(document.title)).toBeInTheDocument()
      expect(getByLabelText('Delete image')).toBeInTheDocument()
    })
  })

  describe('Image Upload', () => {
    beforeEach(() => {
      global.fetch = jest.fn() // Mock fetch before each test
    })

    afterEach(() => {
      jest.restoreAllMocks() // Clear mocks after each test
    })
    it('successfully uploads an image', async () => {
      const file = new File(['(mocked image data)'], 'test-image.png', {
        type: 'image/png',
      })

      // Mock successful response from the API
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          data: testImage,
          error: null,
          message: 'Success',
        }),
      })

      const { getByLabelText, getByText, getByAltText } = render(
        <>
          <ImageForm
            documentId={document.id}
            imageUrl={null}
            imageId={null}
            imageAlt={document.title}
          />
          <Toaster />
        </>,
      )

      const dropzone = getByText('Drag & drop an image here').closest('div')
      const input = getByLabelText('File input') as HTMLInputElement

      // Simulate file drop
      userEvent.upload(input, file)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          '/api/v0.2/upload-document-image',
          expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData),
          }),
        )
      })

      await waitFor(() => {
        expect(getByAltText(document.title)).toBeInTheDocument()
      })
      await waitFor(
        () => {
          expect(getByText('Image uploaded')).toBeInTheDocument()
        },
        { timeout: 4000 },
      )
    })

    it('handles image upload errors', async () => {
      const file = new File(['(mocked image data)'], 'test-image.png', {
        type: 'image/png',
      })

      // Mock error response from the API
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          error: 'Upload failed',
          message: 'Error details',
        }),
      })

      const { getByLabelText, findByText } = render(
        <>
          <ImageForm
            documentId={document.id}
            imageUrl={null}
            imageId={null}
            imageAlt={document.title}
          />
          <Toaster />
        </>,
      )

      const input = getByLabelText('File input') as HTMLInputElement
      userEvent.upload(input, file)

      // if it failed, there will be a toast we cant test from here
      // because its rendered at a higher level

      // Check if toast notification shows the error message
      const errorToast = await findByText('Error details') // Wait for the error message to appear
      expect(errorToast).toBeInTheDocument()

      // // Check that the toast notification is visible for a certain duration (adjust the timeout as needed)
      await waitFor(
        () => {
          expect(errorToast).toBeVisible()
        },
        { timeout: 6000 },
      )
    })

    it('handles file size errors', async () => {
      const largeFile = new File(
        ['(mocked large image data)'],
        'large-image.png',
        {
          type: 'image/png',
        },
      )

      Object.defineProperty(largeFile, 'size', { value: 11 * 1024 * 1024 }) // 11 MB

      const { getByLabelText, findByText } = render(
        <>
          <ImageForm
            documentId={document.id}
            imageUrl={null}
            imageId={null}
            imageAlt={document.title}
          />
          <Toaster />
        </>,
      )

      const input = getByLabelText('File input') as HTMLInputElement
      userEvent.upload(input, largeFile)

      // Check if toast notification shows the correct error message
      const errorToast = await findByText(
        /The file size of large-image.png exceeds the maximum allowed size/,
      )
      expect(errorToast).toBeInTheDocument()

      // Check if the toast notification is visible
      await waitFor(
        () => {
          expect(errorToast).toBeVisible()
        },
        { timeout: 6000 },
      )
    })

    it('only uploads one file', async () => {
      const file1 = new File(['(mocked image data 1)'], 'test-image1.png', {
        type: 'image/png',
      })
      const file2 = new File(['(mocked image data 2)'], 'test-image2.png', {
        type: 'image/png',
      })

      // Mock successful response for the first file upload
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          data: testImage,
          error: null,
          message: 'Success',
        }),
      })

      const { getByLabelText, getByAltText } = render(
        <ImageForm
          documentId={document.id}
          imageUrl={null}
          imageId={null}
          imageAlt={document.title}
        />,
      )

      const input = getByLabelText('File input') as HTMLInputElement

      // Simulate uploading multiple files
      userEvent.upload(input, [file1, file2])

      // Wait for the first image to be rendered
      await waitFor(() => {
        expect(getByAltText(document.title)).toBeInTheDocument()
      })

      // Ensure that `fetch` is only called once, indicating only one file was uploaded
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Image Deletion', () => {
    it('successfully deletes an image', async () => {
      // Mock successful response from the API
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          error: null,
        }),
      })

      const { getByLabelText, queryByAltText } = render(
        <>
          <ImageForm
            documentId={document.id}
            imageUrl={testImage.url}
            imageId={testImage.id}
            imageAlt={document.title}
          />
          <Toaster />
        </>,
      )

      // Click the delete button
      fireEvent.click(getByLabelText('Delete image'))

      // Click the confirmation button in the dialog
      const confirmButton = screen.getByText("Yes, I'm sure")
      fireEvent.click(confirmButton)

      // Wait for the image to be removed
      await waitFor(() => {
        expect(queryByAltText(document.title)).toBeNull()
      })

      // Check if fetch was called with the correct endpoint and method
      expect(fetch).toHaveBeenCalledWith(
        '/api/v0/document/image-delete',
        expect.objectContaining({
          method: 'DELETE',
        }),
      )
    })
  })
})
