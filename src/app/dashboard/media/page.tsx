import MediaUploadForm from "@/app/dashboard/media/_media_components/MediaUploadForm";
import MediaView from "@/app/dashboard/media/_media_components/MediaView";
import { Heading } from "@/components/ui/heading";

export default async function ConsoleMedia() {
	return (
		<>
			<Heading>Media</Heading>
			<MediaUploadForm />
			<MediaView />
		</>
	);
}
