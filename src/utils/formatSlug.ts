/**
 *
 * @param {string} slug - The slug to format
 * @returns {string} - A formatted slug
 * @example
 * formatSlug('My Post');
 * // => 'my-post'
 */
export function formatSlug(slug: string): string {
	if (!slug) {
		return ''
	}

	let s = slug
	// Trim trailing and leading whitespace
	s = s.trim()

	// Remove any non-alphanumeric characters
	s = s.replace(/[^a-zA-Z0-9]/g, ' ')

	// Remove special characters
	s = s.replace(/[^\w\s]/gi, '')

	// Replace multiple spaces with a single space
	s = s.replace(/\s+/g, ' ')

	// Replace spaces with a hyphen
	s = s.replace(/\s/g, '-')

	// Convert to lowercase
	s = s.toLowerCase()

	return s
}
