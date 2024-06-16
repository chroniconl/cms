"use client";
import { Button } from "@/components/ui/button";

export default async function DeleteDocumentButton({
	id,
}: {
	id: string;
}) {
	const handleDeleteDocumentPrompt = () => {
		const confirm = window.confirm("Are you sure you want to delete this document?");
		if (!confirm) {
			alert("Document was not deleted.")
			return
		}

		// Delete the document
		const deleteDocument = async () => {
			try {
				const response = await fetch("/api/v0/document/delete", {
					method: "DELETE",
					body: JSON.stringify({ id }),
				});
				const { error } = await response.json();

				if (error) {
					console.error(error);
					alert("There was an error deleting the document.");
					return;
				}

				alert("Document was deleted.");
				window.location.href = "/dashboard/posts";
			} catch (error) {
				console.error(error);
				alert("There was an error deleting the document.");
			}
		};

		deleteDocument();
	}

	return (
		<Button onClick={handleDeleteDocumentPrompt}>
			Delete
		</Button>
	);
}
