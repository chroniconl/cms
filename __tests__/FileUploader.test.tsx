import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploader from '../src/components/FileUploader';

describe('FileUploader', () => {
	it('should render the drag-and-drop area', () => {
		const { getByText } = render(<FileUploader />);
		expect(getByText('Drag & drop files here')).toBeInTheDocument()
	});

	test('should accept files on drop', async () => {
		const { getByText, container } = render(<FileUploader />);
		const dropArea = getByText('Drag & drop files here');

		const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });

		// Simulate a file drop
		fireEvent.drop(dropArea, {
			dataTransfer: { files: [file] },
		});

		// Wait for the state update and file list to render
		await waitFor(() => {
			expect(container.querySelector('ul li')).toHaveTextContent(file.name);
		});
	});


	it('should change the background color on drag over', () => {
		const { getByText } = render(<FileUploader />);
		const dropZone = getByText('Drag & drop files here').parentElement;

		fireEvent.dragOver(dropZone!);
		
		expect(dropZone).toHaveStyle('background-color: blue-500/20');
	});

	it('should accept files via button click', async () => {
    const user = userEvent.setup()
    const { getByText, getByLabelText } = render(<FileUploader />);
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });

    // Find the hidden file input element 
    const fileInput = getByLabelText('File input');  

    // Simulate the file upload directly to the input
    await user.upload(fileInput, file);

    // Ensure the file name appears in the list
    expect(getByText(file.name)).toBeInTheDocument(); 
  });

	it('should have a select file to upload button', () => {
		const { getByLabelText } = render(<FileUploader />);
		expect(getByLabelText('Select file to upload')).toBeInTheDocument();
	});
});