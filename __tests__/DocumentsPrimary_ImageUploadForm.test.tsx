import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageForm from '../src/app/dashboard/posts/[slug]/edit/_edit_components/ImageForm';
import { useMetaFormStore } from '../src/app/dashboard/posts/[slug]/edit/_edit_state/metaFormStore';

jest.mock('../src/app/dashboard/posts/[slug]/edit/_edit_state/metaFormStore', () => ({
  __esModule: true, // Ensure the module is treated as an ES module
  useMetaFormStore: jest.fn(() => ({
    imageUrl: null,
    setImageUrl: jest.fn(),
    imageId: null,
    setImageId: jest.fn(),
  })),
}));

// When uploading an image in this context, 
// there will be an document ID and an document title 
// we use the document title as the image alt text
const document = {
	id: '123',
	title: 'Example Title',
}

const testImage = {
	id: '456',
	url: process.env.SUPABASE_STORAGE_BUCKET_URL + '/__documents__test/fabian-gieske-cbIKeuURaq8-unsplash.png'
} 

describe('ImageForm', () => {
	beforeEach(() => {
    (useMetaFormStore as unknown as jest.Mock).mockClear(); // Reset the mock between tests
  });

  it('renders without an image initially', async () => {
    const {getByText} = await render(<ImageForm documentId={document.id} imageUrl={null} imageId={null} imageAlt={document.title} />);
    
		expect(getByText('Drag & drop an image here')).toBeInTheDocument();
  });

	it('renders with an image initially', async () => {
		const {getByAltText} = await render(
			<ImageForm 
				documentId={document.id} 
				imageUrl={testImage.url} 
				imageId={testImage.id} 
				imageAlt={document.title} 
			/>
		);
				
		expect(getByAltText(document.title)).toBeInTheDocument();
	});

});


// Component Rendering:

// Initial Render (No Image): Verify the component renders correctly with the FileUploader visible and no image displayed when no image URL is provided.
// Initial Render (With Image): Verify the component renders the Image component correctly, showing the provided image URL and the delete button when an image URL exists.
// Alt Text and Caption: Verify the imageAlt prop is used correctly. This can be done by checking if the alt attribute of the Image component matches the value passed as imageAlt in the props.
// Image Upload:

// Success: Simulate a successful image upload using the FileUploader. Test if the setImageUrl and setImageId functions are called with the correct values. Check if a success toast notification is displayed.
// Error: Simulate an error during image upload. Test if the state variables are not updated and an error toast notification is displayed.
// File Type Validation: Verify that only allowed file types (e.g., .jpg, .png) are accepted by the FileUploader.
// File Size Limit: Test if the FileUploader correctly enforces the file size limit (if you have one).
// Image Deletion:

// Confirmation Dialog: Verify that the confirmation dialog appears when the delete button is clicked.
// Successful Deletion: Simulate confirming the deletion. Check if the setImageUrl and setImageId functions are called with null. Verify that a success toast notification is displayed.
// Canceled Deletion: Simulate canceling the deletion. Test if the state variables remain unchanged and the image is not removed.
// Form Submission:

// Alt Text and Caption Update: Verify that the form correctly updates the image alt text and caption when the form is submitted.
// Error Handling: Simulate an error during form submission. Check if an error toast notification is displayed.