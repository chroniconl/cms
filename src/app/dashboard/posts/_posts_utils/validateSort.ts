export const validateSort = (value: string) => {
  switch (value) {
    case 'default':
      return 'default'
    case 'new-created':
      return 'new-created'
    case 'old-created':
      return 'old-created'
    case 'new-published':
      return 'new-published'
    case 'old-published':
      return 'old-published'
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
        formValue: 'default',
      }
    case 'new-created':
      return {
        value: 'created_at',
        ascending: false,
        formValue: 'new-created',
      }
    case 'old-created':
      return {
        value: 'created_at',
        ascending: true,
        formValue: 'old-created',
      }
    case 'new-published':
      return {
        value: 'publish_date_day',
        ascending: false,
        visibility: 'public',
        formValue: 'new-published',
      }
    case 'old-published':
      return {
        value: 'publish_date_day',
        ascending: true,
        visibility: 'public',
        formValue: 'old-published',
      }
    default:
      return {
        value: 'created_at',
        ascending: false,
        formValue: 'default',
      }
  }
}
