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

interface FilterDataFormProps {
	categories: Category[];
	tags: string[];
}

interface FilterDataFormState {
	category: string;
	tags: string;
}
export default function FilterDataForm({
	categories,
	tags
}: FilterDataFormProps) {
	const { control, handleSubmit } = useForm<FilterDataFormState>({
		defaultValues: {
			category: "",
			tags: ""
		}
	});

	const onSubmit = (data: FilterDataFormState) => {
		console.log(data);
		// Handle form submission
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
							onClick={() => { }}
						>
							<PlusIcon className="w-5 h-5" />
						</Button>
					</div>
				</div>

				<div className="flex flex-col">
					<Label htmlFor="tags">Tags</Label>
					<Controller
						name="tags"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Add a tag"
								className="w-full"
							/>
						)}
					/>
				</div>

				<div className="flex flex-col">
					<Button type="submit">Update Filter Data</Button>
				</div>
			</form>
		</Card>
	);
}