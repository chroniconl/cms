"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

import { useCategoriesStore } from "../_posts_utils/store";
import { Category } from "../_posts_utils/types";

export default function CategoryFilterOption({ categories: categoriesFromServer }: { categories: Category[] }) {
	const { control, watch, setValue, getValues } = useForm<{
		categoryFilterAll: boolean;
		[x: string]: boolean;
	}>({
		defaultValues: {
			["category-filter-all"]: true,
		},
	});
	const categories = useCategoriesStore((state) => state.categories);
	const setCategories = useCategoriesStore((state) => state.setCategories);

	useEffect(() => {
		if (categoriesFromServer) {
			setCategories(categoriesFromServer);
			setValue("category-filter-all", true);
		}
	}, [categoriesFromServer]);

	// Update query whenever the form state changes
	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			// Update query here based on the form values
			const selectedCategories = categories.filter((category) =>
				getValues(`category-filter-${category.id}`)
			);

			console.log("Updated selected categories:", selectedCategories);
		});
		return () => subscription.unsubscribe();
	}, [watch, categories, getValues]);

	// Watch individual checkboxes to determine the state of the "All" checkbox
	const watchCategories = watch(categories.map((category) => `category-filter-${category.id}`));

	// Determine if "All" checkbox should be checked
	const isAllChecked = watchCategories.length > 0 && watchCategories.every((value) => value === true);

	return (
		<Card className="p-4">
			<form>
				<div className="border border-transparent">
					<Label htmlFor="category-filter">Filter by Category</Label>
				</div>
				<div className="flex flex-col gap-2 mt-4">
					{categories && categories.length > 0 ? (
						<>
							<div className="flex items-center gap-2 pl-2 border border-transparent">
								<Controller
									name="category-filter-all"
									control={control}
									defaultValue={true}
									render={({ field }) => (
										<Checkbox
											id="category-filter-all"
											checked={isAllChecked}
											onCheckedChange={(value: boolean) => {
												field.onChange(value);
												categories.forEach((category: any) => {
													setValue(`category-filter-${category.id}`, value);
												});
											}}
										/>
									)}
								/>
								<Label htmlFor="category-filter-all">Select All</Label>
							</div>
							<ScrollArea className="h-72 rounded-md border border-stone-800 bg-stone-800">
								<div className="py-3 px-2 flex flex-col gap-2">

									{categories.map((category: Category) => (
										<div key={category.id} className="flex items-center gap-2">
											<Controller
												name={`category-filter-${category.id}`}
												control={control}
												defaultValue={true}
												render={({ field }) => (
													<Checkbox
														id={`category-filter-${category.id}`}
														checked={field.value}
														onCheckedChange={(value: boolean) => {
															field.onChange(value);
															if (value === false) {
																setValue("category-filter-all", false);
															}
														}}
													/>
												)}
											/>
											<Label htmlFor={`category-filter-${category.id}`}>
												{category.name}
											</Label>
										</div>
									))}
								</div>
							</ScrollArea>
						</>
					) : (
						<>
							{/* No categories */}
							<div className="flex items-center gap-2">
								<Checkbox id="category-filter-none" disabled />
								<Label htmlFor="category-filter-none">None</Label>
							</div>
						</>
					)}
				</div>
			</form >
		</Card>
	);
}
