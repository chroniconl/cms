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

const document = {
	id: '123',
	title: 'Example Title',
}
describe('ImageForm', () => {
	beforeEach(() => {
    (useMetaFormStore as unknown as jest.Mock).mockClear(); // Reset the mock between tests
  });

  it('renders without an image initially', async () => {
    const {getByText} = await render(<ImageForm documentId={document.id} imageUrl={null} imageId={null} imageAlt={document.title} />);
    
		expect(getByText('Drag & drop an image here')).toBeInTheDocument();
  });

});
