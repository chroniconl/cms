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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast";

type MetaFormProps = {
	id: string;
	title: string;
	description: string;
	author?: string;
};

export default function MetaForm({
	id,
	title,
	description 
}: MetaFormProps) {
	const { control, handleSubmit } = useForm<MetaFormProps>({
		defaultValues: {
			title: title || "",
			description: description || "",
			
			// TODO Implement author selection
			author: ""
		}
	});

	const onSubmit = async (data: MetaFormProps) => {
		const response = await fetch("/api/v0.1/document/metadata", {
			method: "PUT",
			body: JSON.stringify({ 
				id,
				title: data.title,
				description: data.description
			}),
		});
		const { error, message } = await response.json();

		if (error) {
			toast({
				title: "Error",
				description: "Failed to update post metadata",
				variant: "destructive",
			})
			return;
		}
		
		toast({
			title: "Success",
			description: "Post metadata updated successfully",
		});
		// Handle form submission
	};

	return (
		<Card className="flex flex-col gap-4">
			<div className="px-4 pt-6 pb-2">
				<Heading level={3}>{"Post Metadata"}</Heading>
			</div>
			<form className="px-4 pb-6 rounded-md space-y-[20px]" role="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col">
					<Label htmlFor="title">Title</Label>
					<Controller
						name="title"
						control={control}
						render={({ field }) => <Input type="text" id="title" placeholder="Enter a title" className="w-full" {...field} />}
					/>
				</div>

				<div className="flex flex-col">
					<Label htmlFor="description">Description</Label>
					<Controller
						name="description"
						control={control}
						render={({ field }) => <Textarea id="description" placeholder="Enter a description" className="w-full" {...field} />}
					/>
				</div>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-10 flex flex-col">
						<div>
							<Label htmlFor="author">Author</Label>
							<Controller
								name="author"
								control={control}
								render={({ field }) => (
									<Select {...field} onValueChange={(value) => field.onChange(value)}>
										<SelectTrigger className="flex items-center justify-between w-full">
											<SelectValue placeholder="Select an author" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">{"Author 1"}</SelectItem>
											<SelectItem value="2">{"Author 2"}</SelectItem>
											<SelectItem value="3">{"Author 3"}</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>
					<div className="col-span-2 flex items-end justify-end h-full">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">
								<PlusIcon className="w-5 h-5" />
								<span className="sr-only">Add a new post</span>
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>This is the post collection for this site</SheetTitle>
								<SheetDescription>
									Choose one of the following options to make the post appear on the homepage as the headline / featured post.
								</SheetDescription>
							</SheetHeader>
						
							<SheetFooter>
								<SheetClose asChild>
									<Button type="submit">Update Post Placement</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
					</div>
				</div>

				<div className="flex flex-col">
					<Button type="submit">Update Metadata</Button>
				</div>
			</form>
		</Card>
	);
}