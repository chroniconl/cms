import { isBefore, parseISO } from "date-fns";

export function isValidDate(dateString: string | Date): boolean {
	if (!dateString) return false;

	if (dateString instanceof Date) {
		return !Number.isNaN(dateString.getTime());
	}

	const date = new Date(dateString);
	return !Number.isNaN(date.getTime());
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

/**
 * @description Checks if a publication time is in the past
 */
export function isPublished(publicationTime: string): boolean {
	// Parse the publication time
	const pubTime = parseISO(publicationTime);

	// Get the current time
	const currentTime = new Date();

	// Compare the publication time with the current time
	if (isBefore(pubTime, currentTime)) {
		return true;
	}
	return false;
}
