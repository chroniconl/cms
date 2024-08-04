"use client"

import React, { useState, useRef } from 'react'
import { Text } from '@/components/text'
import { Button } from '@/components/ui/button'

const FileUploader = ({ 
	onFileDrop = (_) => { return }, // drop event
	onFileChange = (_) => { return }, // button click event
	buttonLabel = 'Select file to upload',
	dropZoneLabel = 'Drag & drop files here',
	acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
}: { 
	onFileDrop?: (files: File[]) => void;
	onFileChange?: (files: File[]) => void;
	buttonLabel?: string;
	dropZoneLabel?: string;
	acceptedFileTypes?: string[];
}) => {
	const [files, setFiles] = useState<File[]>([])
	const [isDragging, setIsDragging] = useState(false)
	const dropRef = useRef<HTMLDivElement>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragging(true)
	}

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragging(false)
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		setIsDragging(false)

		const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      acceptedFileTypes.some(type => file.type.startsWith(type) || file.name.endsWith(type))
    );

    setFiles(validFiles);
    onFileDrop(validFiles);
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(event.target.files || [])

    const validFiles = selectedFiles.filter(file => 
      acceptedFileTypes.some(type => file.type.startsWith(type) || file.name.endsWith(type))
    );
		setFiles(validFiles)
		onFileChange(validFiles)

		setFiles(validFiles)
		onFileChange(validFiles)
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<div>
			<div
				className={`p-4 border border-dashed border-blue-500 rounded w-[300px] max-w-[300px] flex items-center justify-center flex-col ${isDragging ? 'bg-blue-500/20' : ''}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				ref={dropRef}
			>
				<Text>{dropZoneLabel}</Text>
				<div className="flex justify-center items-center mt-2">
					<div className="w-[20px] ch-border-bottom h-[1px] mr-4 mt-1"></div>
					<Text>or</Text>
					<div className="w-[20px] ch-border-bottom h-[1px] ml-4 mt-1"></div>
				</div>
				<Button 
					onClick={handleButtonClick}
					className="mt-4"
					aria-label='Select file to upload'
				>
					{buttonLabel}
				</Button>
			</div>
			<input
				type="file"
				aria-label='File input'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
				multiple
			/>
			<ul>
				{files && files.map((file, index) => (
					<li key={index}>
						<Text key={index}>{file.name}</Text>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FileUploader