import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			className="prose w-full max-w-full dark:prose-invert"
		>
			{markdown}
		</Markdown>
	)
}
