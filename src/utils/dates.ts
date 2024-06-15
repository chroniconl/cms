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
