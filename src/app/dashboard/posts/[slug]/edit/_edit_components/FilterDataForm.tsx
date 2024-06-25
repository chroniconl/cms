"use client";

import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { Category } from "@/utils/types";
import { Text } from "@/components/ui/text";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { create } from "zustand";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface FilterDataFormProps {
	categories: Category[];
	// Tags as an array of objects
	tags: {
		name: string;
		slug: string;
	}[];
	id: string;
	category: {
		id: string;
		name: string;
	};
}

interface FilterDataFormState {
	category: string;
	// Tags as a string separated by commas
	tags: string;
}

const categoryStore = create<{
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	categoryModalOpen: boolean;
	setCategoryModalOpen: (categoryModalOpen: boolean) => void;
}>((set) => ({
	categories: [],
	setCategories: (categories: Category[]) => set({ categories }),
	categoryModalOpen: false,
	setCategoryModalOpen: (categoryModalOpen: boolean) => set({ categoryModalOpen }),
}));

export default function FilterDataForm({
	categories: props__categories,
	tags: props__tags,
	id: props__id,
	category: props__category,
}: FilterDataFormProps) {
	const categories = categoryStore((state) => state.categories);
	const setCategories = categoryStore((state) => state.setCategories);
	const categoryModalOpen = categoryStore((state) => state.categoryModalOpen);
	const setCategoryModalOpen = categoryStore((state) => state.setCategoryModalOpen);

	useEffect(() => {
		if (props__categories) {
			setCategories(props__categories);
		}
	}, [props__categories, setCategories]);

	const { control, handleSubmit } = useForm<FilterDataFormState>({
		defaultValues: {
			category: props__category?.id || "",
			tags: props__tags?.map(tag => tag.name).join(", ")
		}
	});

	const onSubmit = async (data: FilterDataFormState) => {
		const response = await fetch("/api/v0.1/document/filterable-data", {
			method: "POST",
			body: JSON.stringify({
				id: props__id,
				category_id: data.category,
				tags: data.tags,
			}),
		});

		const result = await response.json();

		if (result.error) {
			console.error(result.message)
			toast({
				title: "Error",
				description: "Failed to update filterable data",
				variant: "destructive",
			});
			return;
		}

		toast({
			title: "Success",
			description: "Filterable data updated successfully",
		});
	};

	const { control: categoryControl, handleSubmit: handleCategorySubmit, reset: resetCategoryForm } = useForm({
		defaultValues: {
			name: "",
		}
	});

	const handleAddNewCategory = async (data: {
		name: string;
	}) => {
		const response = await fetch("/api/v0/categories", {
			method: "POST",
			body: JSON.stringify({
				name: data.name,
			}),
		});

		const result = await response.json();

		if (result.error) {
			toast({
				title: "Error",
				description: "Failed to create category",
				variant: "destructive",
			});
			return;
		}

		setCategories([...categories, result.data]);
		resetCategoryForm(); // Reset the form after submission
		setCategoryModalOpen(false); // Close the modal after submission

		toast({
			title: "Success",
			description: "Category created successfully",
		});
	};

	return (
		<Card className="flex flex-col gap-4">
			<div className="px-4 pt-6 pb-2">
				<Heading level={3}>{"Filterable Data"}</Heading>
			</div>
			<form className="px-4 pb-6 rounded-md space-y-[20px]" role="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-10 flex flex-col">
						<Label htmlFor="category">Category</Label>
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<Select {...field} onValueChange={field.onChange}>
									<SelectTrigger className="flex items-center justify-between w-full">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent className="z-10">
										{categories && categories.map((category) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="col-span-2 flex items-end justify-end h-full">
						<Button
							size="icon"
							variant="outline"
							className="w-full"
							type="button"
							onClick={() => setCategoryModalOpen(true)}
						>
							<PlusIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>

				<div className="flex flex-col">
					<Label htmlFor="tags">Tags</Label>
					<Text small>Tags are used to help categorize your post. They are comma separated.</Text>
					<Controller
						name="tags"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Add a tag"
								className="w-full mt-2"
							/>
						)}
					/>
				</div>

				<div className="flex flex-col">
					<Button type="submit">Update Filter Data</Button>
				</div>
			</form>

			<Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create a new category</DialogTitle>
						<DialogDescription>
							Create a new category for your post here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleCategorySubmit(handleAddNewCategory)} className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Controller
								name="name"
								control={categoryControl}
								render={({ field }) => <Input id="name" placeholder="Category Name" className="col-span-3" {...field} />}
							/>
						</div>
						<DialogFooter>
							<Button type="submit">Add Category</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</Card>
	);
}