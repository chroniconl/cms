import { createClient } from '@supabase/supabase-js';
import { failResponse, okResponse } from '@/utils/response'; // Or your preferred response utils
import Logger from '@/utils/logger'; // Your logger setup

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useTestEnv = process.env.NODE_ENV === 'test';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing env variables SUPABASE_URL and SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const logger = new Logger('api.v0.2.upload-document-image', 'chroniconl', process.env.NODE_ENV || 'development');

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('image') as File;
  const documentId = formData.get('id') as string;

  if (!file || !documentId) {
    logger.logError({
      message: 'POST failed - Missing image file or document ID',
    });
    return failResponse('Missing required data'); 
  }

	const fromHere = useTestEnv ? '__documents_test' : 'documents';
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(fromHere)
    .upload(file.name, file)

  if (uploadError) {
    logger.logError({
			message: 'POST failed - Supabase upload error: ' + uploadError.message,			
    });

		// @ts-ignore
		if (uploadError.error === 'Duplicate') {  
			return failResponse('Document already exists');
		}
    return failResponse('Image upload failed');
  }

	const { data: fileData } = await supabase.storage
		.from('documents')
		.getPublicUrl(uploadData.id)

  logger.logPerformance({ message: 'Image POST executed successfully' });

  return okResponse({
    image_id: uploadData.id,
		image_path: uploadData.path,
		image_fullPath: uploadData.fullPath,
		url: process.env.SUPABASE_STORAGE_BUCKET_URL + uploadData.path,
  });
}