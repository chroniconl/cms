export interface Category {
  id: string
  name: string
  color: string
  slug: string
}

export interface PostResponseTypes {
  error: boolean
  message: string
  data: any | null
}
