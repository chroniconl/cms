export const validateSort = (value: string) => {
	switch (value) {
		case 'default':
			return 'default'
		case 'new-published':
			return 'new-published'
		case 'old-published':
			return 'old-published'
		case 'new-private':
			return 'new-private'
		case 'old-private':
			return 'old-private'
		case 'new-draft':
			return 'new-draft'
		case 'old-draft':
			return 'old-draft'
		default:
			return 'default'
	}
}

export const sortParamsToSupabaseQuery = (value: string) => {
	switch (value) {
		case 'default':
			return {
				value: 'created_at',
				ascending: false,
				visibility: 'public',
				formValue: 'default'
			}
		case 'new-published':
			return {
				value: 'publish_date_day',
				ascending: false,
				visibility: 'public',
				formValue: 'new-published'
			}
		case 'old-published':
			return {
				value: 'publish_date_day',
				ascending: true,
				visibility: 'public',
				formValue: 'old-published'
			}
		case 'new-private':
			return {
				value: 'publish_date_day',
				ascending: false,
				visibility: 'private',
				formValue: 'new-private'
			}
		case 'old-private':
			return {
				value: 'publish_date_day',
				ascending: true,
				visibility: 'private',
				formValue: 'old-private'
			}
		case 'new-draft':
			return {
				value: 'publish_date_day',
				ascending: false,
				visibility: 'draft',
				formValue: 'new-draft'
			}
		case 'old-draft':
			return {
				value: 'publish_date_day',
				ascending: true,
				visibility: 'draft',
				formValue: 'old-draft'
			}
		default:
			return {
				value: 'created_at',
				ascending: false,
				formValue: 'default'
			}
	}
}
