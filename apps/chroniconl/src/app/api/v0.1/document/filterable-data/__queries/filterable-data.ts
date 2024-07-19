import { toPST } from '@/utils/dates'
import { formatSlug } from '@/utils/formatSlug'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

export const validateIncomingData = (requestData: any) => {
  const schema = joi.object({
    id: joi.string().required(),
    category_id: joi.string().allow('').optional(),
    tags: joi.string().allow('').optional(),
  })
  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    return validationError.message
  }

  return null
}

interface TagCollectionItem {
  id: string
  name: string
}

interface TagError {
  message: string
  code: string
}
type TagCollection = TagCollectionItem[]

interface TagResponse {
  data: TagCollection | null
  error: TagError | null
}

export const findTagsThatAlreadyExistInDatabase = async (
  tags: string[],
): Promise<TagResponse> => {
  const { data: tagsThatExistData, error: tagsThatExistError } = await supabase
    .from('tags')
    .select('id, name')
    .in('name', tags)

  if (tagsThatExistError) {
    return { data: null, error: tagsThatExistError }
  }

  return { data: tagsThatExistData, error: null }
}

export const createTagsInDatabase = async (
  tags: string[],
  userData: { id: string },
): Promise<TagResponse> => {
  const { data: tagsData, error: tagsError } = await supabase
    .from('tags')
    .upsert(
      tags.map((tag) => ({
        name: tag,
        slug: formatSlug(tag),
        last_updated: toPST(new Date()),
        created_by: userData?.id,
      })),
    )
    .select()

  if (tagsError) {
    // throw new Error(tagsError?.message)
    return { data: null, error: tagsError }
  }

  return { data: tagsData, error: null }
}

export const getTagsThatAlreadyExistInDatabase = async (
  tags: string[],
): Promise<TagResponse> => {
  const { data: tagsThatExistData, error: tagsThatExistError } = await supabase
    .from('tags')
    .select('id, name')
    .in('name', tags)

  if (tagsThatExistError) {
    // throw new Error(tagsThatExistError?.message)
    return { data: null, error: tagsThatExistError }
  }

  return { data: tagsThatExistData, error: null }
}

export const createTagsRelationshipsInDatabase = async (
  tags: TagCollection,
  additionalInfo: {
    tagAuthorId: string
    postId: string
  },
): Promise<TagResponse> => {
  const { data, error: tagsError } = await supabase
    .from('post_tag_relationship')
    .insert(
      tags.map((tag) => ({
        tag_id: tag.id,
        post_id: additionalInfo.postId,
        created_by: additionalInfo.tagAuthorId,
      })),
    )
    .select()

  if (tagsError) {
    // throw new Error(tagsError?.message)
    return { data: null, error: tagsError }
  }

  // return data
  return { data: data, error: null }
}
