import { getCurrentUser } from '@/server/getCurrentUser'
import { formatSlug } from '@/utils/formatSlug'
import {
  bypassOkResponse,
  failResponse,
  okResponse,
  skirtFailedResponse,
} from '@/utils/response'
import { supabase } from '@/utils/supabase'
import {
  documentCreate__v0__AuthError,
  documentCreate__v0__DatabaseError,
  documentCreate__v0__GeneralError,
  documentCreate__v0__PerformanceSuccess,
} from './loggingActions'

async function createDocumentWithTitle(title: string): Promise<any> {
  try {
    const { data: userData, error: userError } = await getCurrentUser()
    if (userError) {
      void documentCreate__v0__AuthError(userError)
      return failResponse('Trouble getting user')
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title,
        content: '<p>Nothing here yet</p>',
        slug: formatSlug(title),
        user_id: userData?.id,
        last_updated: new Date(),
      })
      .select()

    if (error) {
      if (error.code === '23505') {
        void documentCreate__v0__GeneralError(
          'Document with that title already exists',
        )
        return skirtFailedResponse('Document with that title already exists')
      }

      void documentCreate__v0__DatabaseError(error)
      return skirtFailedResponse('Failed to create document')
    }
    return bypassOkResponse(data[0].slug)
  } catch (error) {
    void documentCreate__v0__DatabaseError(error)
    return skirtFailedResponse('Failed to create document')
  }
}

export async function POST(request: Request) {
  const start = performance.now()
  const data = await request.json()

  const responseObject = await createDocumentWithTitle(data.title)

  if (responseObject?.error === true) {
    void documentCreate__v0__GeneralError(responseObject.message)
    return failResponse(responseObject.message)
  }

  const end = performance.now()
  void documentCreate__v0__PerformanceSuccess(start, end)
  return okResponse(responseObject.data)
}
