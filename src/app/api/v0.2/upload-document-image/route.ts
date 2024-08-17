import { createClient } from '@supabase/supabase-js'
import { failResponse, okResponse } from '@/utils/response'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'
import { getCurrentUser } from '@/server/getCurrentUser'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const useTestEnv = process.env.NODE_ENV === 'test'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing env variables SUPABASE_URL and SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.2.upload-document-image.POST',
    request: request,
  })
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const formData = await request.formData()
  const file = formData.get('image') as File
  const documentId = formData.get('id') as string

  if (!file || !documentId) {
    void logger.logGeneralError('Missing required data')
    return failResponse('Missing required data')
  }

  const fromHere = useTestEnv ? '__documents_test' : 'documents'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(fromHere)
    .upload(file.name, file)

  if (uploadError) {
    void logger.logGeneralError(uploadError)

    // @ts-ignore
    if (uploadError.error === 'Duplicate') {
      return failResponse('Document already exists')
    }
    return failResponse('Image upload failed')
  }

  // Update the document with the new image
  const { error: documentError } = await supabase
    .from('posts')
    .update({
      image_url: process.env.SUPABASE_STORAGE_BUCKET_URL + uploadData.path,
      last_updated: new Date(),
    })
    .eq('id', documentId)
    .single()

  if (documentError) {
    void logger.logDatabaseError(documentError)
    return failResponse('Error updating document')
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse({
    image_id: uploadData.id,
    image_path: uploadData.path,
    image_fullPath: uploadData.fullPath,
    url: process.env.SUPABASE_STORAGE_BUCKET_URL + uploadData.path,
  })
}
