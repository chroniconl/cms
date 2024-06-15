"use client";
import React, { useCallback, useEffect } from "react";

import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/a11y-dark.css';

// load all highlight.js languages
// import { lowlight } from 'lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', js)
hljs.registerLanguage('typescript', ts)
hljs.registerLanguage('xml', html)

import { Button } from "@/components/ui/button";
import {
	ArrowDownWideNarrow,
	BoldIcon,
	BracketsIcon,
	ImageIcon,
	ItalicIcon,
	Link2Icon,
	Link2OffIcon,
	List,
	MinusIcon,
	Strikethrough,
	TextQuote,
	UnderlineIcon,
} from "lucide-react";
import { debounce } from "@/utils/debounce";

const TipTap = ({
	defaultValue,
	params,
	editable = true,
	className = 'min-h-[600px] w-full min-w-full px-4 py-2 prose dark:prose-invert prose-li:py-1 prose:w-full prose-p:0.5 prose-stone'
}: {
	defaultValue?: string;
	params?: {
		slug: string;
	};
	editable?: boolean;
	className?: string;
}) => {
	const editor = useEditor({
		editable: editable,
		editorProps: {
			attributes: {
				class: className,
			},
		},
		extensions: [
			StarterKit.configure({
				heading: false,
				strike: false,
				codeBlock: false,
				bulletList: false,
				orderedList: false,
				blockquote: false,
				hardBreak: false,
				horizontalRule: false,
				listItem: false,
			}),
			Underline,
			Link.configure({
				openOnClick: false,
				autolink: true,
			}),
			Strike,
			Image,
			Blockquote,
			BulletList,
			ListItem,
			CodeBlockLowlight.configure({
				lowlight,
			}),
			HardBreak,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			HorizontalRule,
			OrderedList,
		],
		content: defaultValue || ""
	});

	const debouncedUpdate = useCallback(
		debounce(async (content: string) => {
			await fetch("/api/v0/document", {
				method: "PUT",
				body: JSON.stringify({
					slug: params?.slug,
					content,
				}),
			});
		}, 500),
		[params?.slug]
	);

	useEffect(() => {
		if (!editor) {
			return;
		}

		editor.on('update', ({ editor }: any) => {
			if (!params?.slug) return;

			const content = editor.getHTML();
			debouncedUpdate(content);
		});
	}, [editor, debouncedUpdate]);

	const setLink = useCallback(() => {
		if (!editor) {
			return;
		}

		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();

			return;
		}

		// update link
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	}, [editor]);

	const addImage = useCallback(() => {
		const url = window.prompt("URL");

		if (url) {
			if (!editor) {
				return;
			}

			editor.chain().focus().setImage({ src: url }).run();
		}
	}, [editor]);

	if (!editor) {
		return null;
	}

	return (
		<div>
			{
				editable && (
					<div className="border-b border-accent flex flex-wrap items-center sticky top-0 bg-background z-10 gap-1">
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleBold().run()}
							disabled={!editor.can().chain().focus().toggleBold().run()}
							className={
								editor.isActive("bold") ? "bg-accent text-accent-foreground" : ""
							}
						>
							<BoldIcon className="w-5 h-5" />
							<span className="sr-only">Bold</span>
						</Button>
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleItalic().run()}
							disabled={!editor.can().chain().focus().toggleItalic().run()}
							className={
								editor.isActive("italic") ? "bg-accent text-accent-foreground" : ""
							}
						>
							<ItalicIcon className="w-5 h-5" />
							<span className="sr-only">Italic</span>
						</Button>
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							disabled={!editor.can().chain().focus().toggleUnderline().run()}
							className={
								editor.isActive("underline")
									? "bg-accent text-accent-foreground"
									: ""
							}
						>
							<UnderlineIcon className="w-5 h-5" />
							<span className="sr-only">Underline</span>
						</Button>

						<Button size={"icon"} variant={"ghost"} onClick={setLink}>
							<Link2Icon className="w-5 h-5" />
							<span className="sr-only">Link</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().unsetLink().run()}
							disabled={!editor.isActive("link")}
						>
							<Link2OffIcon className="w-5 h-5" />
							<span className="sr-only">Unset Link</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleStrike().run()}
							className={
								editor.isActive("strike") ? "bg-accent text-accent-foreground" : ""
							}
						>
							<Strikethrough className="w-5 h-5" />
							<span className="sr-only">Strike</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={addImage}
							className={
								editor.isActive("strike") ? "bg-accent text-accent-foreground" : ""
							}
						>
							<ImageIcon className="w-5 h-5" />
							<span className="sr-only">Image</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
							className={
								editor.isActive("blockquote")
									? "bg-accent text-accent-foreground"
									: ""
							}
						>
							<TextQuote className="w-5 h-5" />
							<span className="sr-only">Block quote</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleBulletList().run()}
							className={
								editor.isActive("bulletList")
									? "bg-accent text-accent-foreground"
									: ""
							}
						>
							<List className="w-5 h-5" />
							<span className="sr-only">Bullet List</span>
						</Button>
						<Button
							// size={'icon'}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
							className={
								editor.isActive("orderedList")
									? "bg-accent text-accent-foreground"
									: ""
							}
						>
							<NumberedList className="w-5 h-5" />
							<span className="sr-only">Ordered List</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().toggleCodeBlock().run()}
							className={
								editor.isActive("codeBlock")
									? "bg-accent text-accent-foreground"
									: ""
							}
						>
							<BracketsIcon className="w-5 h-5" />
							<span className="sr-only">Code block</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().setHardBreak().run()}
						>
							<ArrowDownWideNarrow className="w-5 h-5" />
							<span className="sr-only">Hard break</span>
						</Button>

						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => editor.chain().focus().setHorizontalRule().run()}
						>
							<MinusIcon className="w-5 h-5" />
							<span className="sr-only">Horizontal Rule</span>
						</Button>
					</div>
				)
			}
			<div className="mt-1" id="tiptap">
				<EditorContent editor={editor} />
			</div>
			<style jsx>{`
				.prose > ul > li > p {
					margin: 0;
				}
			`}</style>
		</div>
	);
};

export default TipTap;

function NumberedList({
	className,
}: {
	className?: string;
}) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			x="0"
			y="0"
			stroke="none"
			fill="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			viewBox="0 0 24 24"
		>
			<title>Numbered List</title>
			<path d="M34.107 27.75H10.643a.322.322 0 00-.322.321v2.25c0 .177.145.322.322.322h23.464a.322.322 0 00.322-.322v-2.25a.322.322 0 00-.322-.321zm0-22.822H10.643a.322.322 0 00-.322.322V7.5c0 .177.145.321.322.321h23.464a.322.322 0 00.322-.321V5.25a.322.322 0 00-.322-.322zm0 11.411H10.643a.322.322 0 00-.322.322v2.25c0 .176.145.321.322.321h23.464a.322.322 0 00.322-.321v-2.25a.322.322 0 00-.322-.322zM3.95 9h1.179V3.363H3.953L2.496 4.375v1.063l1.383-.961h.07V9zM2.57 20h4.067v-.95H3.836l.316.208v-.516l-.316.516 1.36-1.27c.343-.317.614-.595.812-.832.198-.237.338-.457.422-.66.083-.206.125-.415.125-.629v-.012c0-.325-.085-.61-.254-.855a1.67 1.67 0 00-.696-.574 2.386 2.386 0 00-1.023-.207c-.411 0-.773.077-1.086.23-.31.154-.553.367-.73.64-.175.274-.262.59-.262.95l.004.02h1.09v-.02c0-.18.039-.336.117-.469a.817.817 0 01.328-.316.98.98 0 01.484-.117c.18 0 .335.035.465.105.13.068.23.163.297.285a.84.84 0 01.106.426v.012a.919.919 0 01-.086.387 1.972 1.972 0 01-.305.433c-.146.164-.352.374-.617.63L2.57 19.206V20zM4.676 32.125c.44 0 .824-.072 1.152-.215.328-.143.583-.344.766-.601.185-.258.277-.558.277-.899v-.008c0-.383-.126-.69-.379-.922-.252-.231-.588-.367-1.008-.406v-.023a1.76 1.76 0 00.598-.242c.177-.115.318-.26.422-.438.104-.177.156-.383.156-.617v-.008a1.3 1.3 0 00-.246-.789 1.561 1.561 0 00-.691-.527 2.676 2.676 0 00-1.055-.192c-.396 0-.744.07-1.043.207a1.732 1.732 0 00-.71.578 1.75 1.75 0 00-.306.88l-.004.046h1.086l.004-.035a.802.802 0 01.484-.676c.141-.062.304-.093.489-.093s.342.03.473.093c.132.06.233.147.3.262.07.112.106.246.106.402v.008c0 .151-.04.285-.121.402a.805.805 0 01-.34.27 1.256 1.256 0 01-.516.098h-.629v.84h.645c.341 0 .607.071.797.214.193.144.289.35.289.621v.008c0 .16-.042.3-.125.422a.816.816 0 01-.348.29 1.252 1.252 0 01-.523.1c-.203 0-.382-.03-.535-.093a.93.93 0 01-.368-.266.787.787 0 01-.16-.39l-.004-.043H2.48l.004.05c.029.337.136.632.32.887.186.253.437.45.755.594.32.14.692.211 1.117.211z" />
			<text
				y="51"
				fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
				fontSize="5"
				fontWeight="bold"
			>
				Created by Lourenchyus
			</text>
			<text
				y="56"
				fill="#000"
				fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
				fontSize="5"
				fontWeight="bold"
			>
				from the Noun Project
			</text>
		</svg>
	);
}
