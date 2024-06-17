"use client";

import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { parseISO } from "date-fns";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerSimple, DatePickerWithPresets } from "@/components/general/DatePicker";
import { Button } from "@/components/ui/button";
import { Category } from "@/utils/types";
import { isValidDate } from "@/utils/dates";
import { useMetaFormStore } from "../_state/metaFormStore";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";

export default function MetaForm({
	id: props__id,
	visibility: props__visibility,
	description: props__description,
	createdAt: props__createdAt,
	publishDate: props__publishDate,
	currentCategory: props__currentCategory,
	slug: props__slug,
}: {
	id: string;
	visibility: string;
	description: string;
	createdAt: string;
	publishDate: string;
	currentCategory: Category
	slug: string;
}) {
	const categories = useMetaFormStore((state) => state.categories);
	const setCategories = useMetaFormStore((state) => state.setCategories);

	const setPublishDate = useMetaFormStore((state) => state.setPublishDate);
	const store__publishDate = useMetaFormStore((state) => state.publishDate);

	const setCreatedAt = useMetaFormStore((state) => state.setCreatedAt);
	const store__createdAt = useMetaFormStore((state) => state.createdAt);

	const setVisibility = useMetaFormStore((state) => state.setVisibility);
	const setCurrentCategory = useMetaFormStore((state) => state.setCurrentCategory);

	const handleCategoryModalOpen = async () => {
		const newCategoryName = prompt('Enter new category name');
		const response = await fetch('/api/v0/categories', {
			method: 'POST',
			body: JSON.stringify({ name: newCategoryName }),
		});
		const { data, error, message } = await response.json();

		// TODO Type check all responses
		if (error) {
			console.log(message);
			return;
		}

		console.log(data);

		if (typeof setCategories !== 'function') return;
		setCategories([...categories, data]);

		// set current category to new category
		updateCategory(data.id, props__id);
	}

	// TODO: Move to server component and fetch on load but not in the page itself
	const setCategories__IntoStateOnLoad = () => {
		const fetchCategories = async () => {
			const response = await fetch('/api/v0/categories');
			const { data, error, message } = await response.json();

			if (error) {
				console.log(message);
				return;
			}

			if (typeof setCategories !== 'function') return;
			setCategories(data);
		}

		fetchCategories();
	}
	useEffect(setCategories__IntoStateOnLoad, []);

	const setProps__IntoStateOnLoad = () => {
		const publishDate = isValidDate(props__publishDate) ? parseISO(props__publishDate) : null;
		const createdAt = isValidDate(props__createdAt) ? parseISO(props__createdAt) : null;

		// Set state
		// This typeof shit is so dumb but was required for testing
		if (publishDate && typeof setPublishDate === 'function') {
			setPublishDate(publishDate);
		}

		if (createdAt && typeof setCreatedAt === 'function') {
			setCreatedAt(createdAt);
		}

		if (typeof setVisibility === 'function') {
			setVisibility(props__visibility);
		}

		if (typeof setCurrentCategory === 'function') {
			setCurrentCategory(props__currentCategory?.id);
		}
	}
	useEffect(setProps__IntoStateOnLoad, []);

	return (
		<div className="flex flex-col gap-4">
			<form className="px-4 bg-secondary py-6 rounded-md" role="form">
				<Heading level={3}>{"Document Settings"}</Heading>				
				<div id="meta-form--visibility" className="mt-4">
					<Label>{"Select Visibility"}</Label>
					<Select
						defaultValue={props__visibility}
						onValueChange={(value) => {
							updateVisibility(value, props__id);
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue
								placeholder={'Select visibility'}
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="public">{"Public"}</SelectItem>
							<SelectItem value="private">{"Private"}</SelectItem>
							<SelectItem value="draft">{"Draft"}</SelectItem>
						</SelectContent>
					</Select>
				</div>
								
				{/* TODO: make featured post toggle - 3 posts may be featured*/}
				{/* TODO: make primary featured post toggle - 1 post may be primary featured */}


				<div id="meta-form--category" className="mt-4 grid grid-cols-12 gap-4">
					<div className="col-span-10">
						<Label>{"Select Category"}</Label>
						<Select
							name="currentCategory"
							onValueChange={
								(value) => updateCategory(value, props__id)
							}
							defaultValue={props__currentCategory?.id}
						>
							<SelectTrigger className="w-full">
								<SelectValue
									placeholder={'Select category'}
								/>
							</SelectTrigger>
							<SelectContent>
								{Array.isArray(categories) && categories.map((category) => (
									<SelectItem key={category?.id} value={category?.id}>
										{category?.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-2 flex items-end">
						<Button
							size="icon"
							variant="ghost"
							className="w-full"
							type="button"
							onClick={handleCategoryModalOpen}
						>
							<PlusIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>
				<div id="meta-form--description" className="mt-4">
					<Label>{"Description"}</Label>
					<Textarea
						name="description"
						defaultValue={props__description}
						onChange={(e) => {
							updateDescription(e.target.value, props__id);
						}}
					/>
				</div>
				<div id="meta-form--published-at" className="mt-4 flex flex-col gap-2">
					<Label>{"Publish Date"}</Label>
					<DatePickerWithPresets
						date={new Date(store__publishDate)}
						setDate={(date) => {
							updatePublishDate(date, props__id);

							if (typeof setPublishDate !== 'function') return;
							setPublishDate(date);
						}}
						name="publishDate"
						disabled={store__publishDate === null || store__publishDate === undefined}
					/>
				</div>
			</form>
			
			<div className="px-4 bg-secondary py-6 rounded-md">
				<Heading level={3}>Page Info</Heading>
				{/* display slug */}
				<div className="flex flex-col gap-2 mt-4">
					<Label>{"Slug"}</Label>
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1">
							<Input type="text" value={props__slug} disabled/>
						</div>
					</div>
				</div>

				
				<div id="meta-form--created-at" className="mt-4 flex flex-col gap-2">
					<Label>{"Created At"}</Label>
					<DatePickerSimple
						date={new Date(store__createdAt)}
						setDate={(date) => {
							setCreatedAt(date);
						}}
						disabled
					/>
				</div>
				
			</div>
		</div>
	);
}

const updateVisibility = (newValue: string, id: string) => {
	const fetcher = async () => {
		const response = await fetch('/api/v0/document/visibility', {
			method: 'PUT',
			body: JSON.stringify({ visibility: newValue, id }),
		});
		const { data, error, message } = await response.json();

		if (error) {
			console.log(message);
			return;
		}

		console.log(data);
	}

	fetcher();
}

const updateDescription = (newValue: string, id: string) => {
	const fetcher = async () => {
		const response = await fetch('/api/v0/document/description', {
			method: 'PUT',
			body: JSON.stringify({ description: newValue, id }),
		});
		const { data, error, message } = await response.json();

		if (error) {
			console.log(message);
			return;
		}

		console.log(data);
	}

	fetcher();
}

const updatePublishDate = (newValue: Date, id: string) => {
	const fetcher = async () => {
		const response = await fetch('/api/v0/document/publish-date', {
			method: 'PUT',
			body: JSON.stringify({ publish_date: newValue, id }),
		});
		const { data, error, message } = await response.json();

		if (error) {
			console.log(message);
			return;
		}

		console.log(data);
	}

	fetcher();
}

const updateCategory = (newValue: string, id: string) => {
	const fetcher = async () => {
		const response = await fetch('/api/v0/document/category-id', {
			method: 'PUT',
			body: JSON.stringify({ category_id: newValue, id }),
		});
		const { data, error, message } = await response.json();

		if (error) {
			console.log(message);
			return;
		}

		console.log(data);
	}

	fetcher();
}