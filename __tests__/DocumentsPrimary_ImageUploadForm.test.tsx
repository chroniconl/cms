import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ImageForm from '../src/app/dashboard/posts/[slug]/edit/_edit_components/ImageForm'
import { useMetaFormStore } from '../src/app/dashboard/posts/[slug]/edit/_edit_state/metaFormStore'
import userEvent from '@testing-library/user-event'
import { Toaster } from '../src/components/ui/toaster'

jest.mock(
  '../src/app/dashboard/posts/[slug]/edit/_edit_state/metaFormStore',
  () => ({
    __esModule: true, // Ensure the module is treated as an ES module
    useMetaFormStore: jest.fn(() => ({
      imageUrl: null,
      setImageUrl: jest.fn(),
      imageId: null,
      setImageId: jest.fn(),
    })),
  }),
)

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
  beforeEach(() => {
    ;(useMetaFormStore as unknown as jest.Mock).mockClear() // Reset the mock between tests
  })

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
  })
})

// Image Upload:

// File Type Validation: Verify that only allowed file types (e.g., .jpg, .png) are accepted by the FileUploader.
// File Size Limit: Test if the FileUploader correctly enforces the file size limit (if you have one).
// Image Deletion:

// Confirmation Dialog: Verify that the confirmation dialog appears when the delete button is clicked.
// Successful Deletion: Simulate confirming the deletion. Check if the setImageUrl and setImageId functions are called with null. Verify that a success toast notification is displayed.
// Canceled Deletion: Simulate canceling the deletion. Test if the state variables remain unchanged and the image is not removed.
// Form Submission:

// Alt Text and Caption Update: Verify that the form correctly updates the image alt text and caption when the form is submitted.
// Error Handling: Simulate an error during form submission. Check if an error toast notification is displayed.
