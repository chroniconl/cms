'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

export default function ClientPlacementForm({
	id,
	posts,
	headlinePost
}: {
	id: string
	posts: {
		id: string,
		title: string
	}[]
	headlinePost: boolean
}) {
	const handleHeadlinePost = async () => {
		const response = await fetch("/api/v0.1/document/headline-post", {
			method: "PUT",
			body: JSON.stringify({ id }),
		});
		const { data, error, message } = await response.json();

		if (error) {
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			})
			return;
		}

		toast({
			title: "Success",
			description: "Post set as headline post",
		});
	}
	return (
		<Card className="px-4 py-6 rounded-md">
			<div className="flex flex-col w-full mb-4">
				<Heading level={3}>{"Placement"}</Heading>
				<Text small>{"Choose where you want your post to appear on the homepage."}</Text>

				{headlinePost && (
					<div className="mt-4 w-full border border-green-500 rounded-md p-2">
						<span className="text-bold text-lg text-green-600">
							This is the Headline Post
						</span>
					</div>
				)}

				<div className="flex mt-4">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline" disabled={headlinePost}>Set as Headline Post</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This will override the current headline post and set this post as the headline post. Changes will be applied when the post is published. If the post is already published, the changes will be applied immediately.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleHeadlinePost}>Yes, I'm sure</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</Card>
	)
}