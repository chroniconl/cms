export function tagSeparator(input: string): string[] {
	// Split the string by commas and trim whitespace
	const items = input.split(',').map(item => item.trim());
	
	// Create a Set to remove duplicates and convert it back to an array
	const uniqueItems = Array.from(new Set(items));

	return uniqueItems;
}
