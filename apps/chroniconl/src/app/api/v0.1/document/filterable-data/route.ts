/**
 * tags are crazy 
 */
import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { tagSeparator } from '@/utils/tagSeparator'
import { 
	validateIncomingData, 
	findTagsThatAlreadyExistInDatabase, 
	createTagsInDatabase, 
	getTagsThatAlreadyExistInDatabase, 
	createTagsRelationshipsInDatabase
} from './__queries/filterable-data'

export async function POST(request: Request) {
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    return failResponse('Trouble getting user')
  }
	
  const requestData = await request.json()
	const validationError = validateIncomingData(requestData)
	if (validationError) {
		return failResponse(validationError)
	}

  // parse tags
  const tags: string[] = tagSeparator(requestData.tags)

	const { data: tagsThatExistData, error: tagsThatExistError } = await findTagsThatAlreadyExistInDatabase(tags)
	if (tagsThatExistError) {
		return failResponse(tagsThatExistError?.message)
	}

  // Remove any tags that already exist in the database
  const tagsToInsert = tags.filter(
    (tag) => !tagsThatExistData?.find((tagData) => tagData.name === tag),
  )

	// create tags in database using the filtered (new) tags array 
	const { data: newTagsData, error: newTagsError } = await createTagsInDatabase(tagsToInsert, userData)
	if (newTagsError) {
		return failResponse(newTagsError?.message)
	}

	// TODO: TEST that we got the tags back at this point
	// console.log('newTagsData', newTagsData)
	
	// find the tags that already exist in the database
	const tagsToRetrieveFromDatabase = tags.filter(
		(tag) => tagsThatExistData?.find((tagData) => tagData.name === tag),
	)
	
	// retrieve tags that are already in the database
	const { data: tagsRetrievedData, error: tagsRetrievedError } = await getTagsThatAlreadyExistInDatabase(tagsToRetrieveFromDatabase)
	if (tagsRetrievedError) {
		return failResponse(tagsRetrievedError?.message)
	}
	
	// merge the two arrays
	const tagsDataMerged = [...newTagsData || [], ...tagsRetrievedData || []]

	// if the post_tag_relationship table already has the tags, we don't need to create them again
	// otherwise we see duplicate names in the post relationship 
	const { data: existingPostTagRelationshipData, error: existingPostTagRelationshipError } = await supabase
		.from('post_tag_relationship')
		.select('*')
		.eq('post_id', requestData.id)

	if (existingPostTagRelationshipError) {
		return failResponse(existingPostTagRelationshipError?.message)
	}

	const postTagRelationshipDataIds = existingPostTagRelationshipData?.map(({postTagRelationship}) => postTagRelationship.tag_id)
	
	// remove the tags that already exist in the post_tag_relationship table
	const tagsDataMergedWithoutExistingRelationships = tagsDataMerged.filter((tag) => !postTagRelationshipDataIds.includes(tag.id))

  // create post_tag_relationship in database
	const { error: postTagRelationshipError } = await createTagsRelationshipsInDatabase(tagsDataMergedWithoutExistingRelationships, {
		tagAuthorId: userData?.id,
		postId: requestData.id,
	})

  if (postTagRelationshipError) {
    return failResponse(postTagRelationshipError?.message)
  }
  
  if (requestData.category_id) {
    const { error: postError } = await supabase
      .from('posts')
      .update({
        category_id: requestData.category_id,
      })
      .match({ id: requestData.id })

    if (postError) {
      return failResponse(postError?.message)
    }
  }

  return okResponse('Document updated')
}
