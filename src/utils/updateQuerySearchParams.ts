export const updateQuerySearchParams = (newParams: any) => {
	const searchParams = new URLSearchParams(window.location.search)
	Object.entries(newParams).forEach(([key, value]) => {
		if (value) {
			searchParams.set(key, value as string)
		} else {
			searchParams.delete(key)
		}
	})
	return searchParams.toString()
}
