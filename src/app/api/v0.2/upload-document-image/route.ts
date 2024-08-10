import { createClient } from '@supabase/supabase-js'
import { failResponse, okResponse } from '@/utils/response'
import {
  uploadDocumentImage__v0_2__MissingDataError,
  uploadDocumentImage__v0_2__UploadError,
  uploadDocumentImage__v0_2__DocumentUpdateError,
  uploadDocumentImage__v0_2__PerformanceSuccess,
} from './loggingActions'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const useTestEnv = process.env.NODE_ENV === 'test'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing env variables SUPABASE_URL and SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  const start = performance.now()
  const formData = await request.formData()
  const file = formData.get('image') as File
  const documentId = formData.get('id') as string

  if (!file || !documentId) {
    void uploadDocumentImage__v0_2__MissingDataError()
    return failResponse('Missing required data')
  }

  const fromHere = useTestEnv ? '__documents_test' : 'documents'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(fromHere)
    .upload(file.name, file)

  if (uploadError) {
    void uploadDocumentImage__v0_2__UploadError(uploadError)
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
    void uploadDocumentImage__v0_2__DocumentUpdateError(documentError)
    return failResponse('Error updating document')
  }

  const end = performance.now()
  void uploadDocumentImage__v0_2__PerformanceSuccess(start, end)
  return okResponse({
    image_id: uploadData.id,
    image_path: uploadData.path,
    image_fullPath: uploadData.fullPath,
    url: process.env.SUPABASE_STORAGE_BUCKET_URL + uploadData.path,
  })
}
