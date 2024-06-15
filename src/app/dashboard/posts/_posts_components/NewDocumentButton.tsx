"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialogV2'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatSlug } from "@/utils/formatSlug";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function NewDocumentButton({ url = "chroniconl.com" }: { url: string }) {
	const [modalOpen, setModalOpen] = useState(false)
	const [inputValue, setInputValue] = useState("");

	const { control, handleSubmit, watch, register } = useForm({
		defaultValues: {
			title: "",
			url: "",
		},
	});

	const createNewPost = async (data: any) => {
		const title = data.title;
		const url = data.url;

		try {
			const response = await fetch("/api/v0/document/create", {
				method: "POST",
				body: JSON.stringify({ title, url }),
			})
			const { data: slug, error, message } = await response.json();

			if (error) {
				alert(message);
				return;
			}

			window.location.href = `/dashboard/posts/${slug}/edit`;
		}

		catch (error) {
			console.error(error);
			return;
		}
	}

	const urlPreviewValue = 'https://' + url + "/" + formatSlug(watch("title", ""));

	return (
		<>
			<Button onClick={() => setModalOpen(true)} className="h-fit">
				Create Post
			</Button>
			<Dialog
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<DialogTitle>Create New Post</DialogTitle>
				<DialogDescription>

				</DialogDescription>
				<DialogBody>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit(createNewPost)}>
						<div>
							<Label htmlFor="title">
								Title
							</Label>
							<Controller
								name="title"
								control={control}
								defaultValue={inputValue}
								
								render={({ field }: any) => (
									<Input
										{...field}
										type="text"
										placeholder="Enter the title of the document"
									/>
								)}
							/>
						</div>

						<div>
							<Label htmlFor="url">
								Url Preview
							</Label>
							<Input
								type="text"
								name="url"
								id="url"
								placeholder={url || "https://"}
								defaultValue={urlPreviewValue}
								disabled
							/>
						</div>

						<Button type="submit">Create Post</Button>
						<Button onClick={() => setModalOpen(false)}>
							Cancel
						</Button>
					</form>
				</DialogBody>
			</Dialog>
		</>
	)
}