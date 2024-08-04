"use client"

import React, { useState, useRef } from 'react'
import { Text } from '@/components/text'
import { Button } from '@/components/ui/button'

const FileUploader = ({ 
	onFileDrop = (_) => { return }, // drop event
	onFileChange = (_) => { return }, // button click event
}: { 
	onFileDrop?: (files: File[]) => void,
	onFileChange?: (files: File[]) => void,
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
		const acceptedFiles = Array.from(event.dataTransfer.files)
		setFiles(acceptedFiles)
		onFileDrop(acceptedFiles)
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(event.target.files || [])
		setFiles(selectedFiles)
		onFileChange(selectedFiles)
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
				<p>Drag & drop files here</p>
				<div className="flex justify-center items-center mt-2">
					<div className="w-[20px] ch-border-bottom h-[1px]"></div>
					<span className="text-center px-5">or</span>
					<div className="w-[20px] ch-border-bottom h-[1px]"></div>
				</div>
				<Button 
					onClick={handleButtonClick}
					className="mt-4"
					aria-label='Select file to upload'
				>
					Select file to upload
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