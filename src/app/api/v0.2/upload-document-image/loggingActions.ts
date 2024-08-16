import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.2.upload-document-image.POST',
  httpMethod: 'POST',
})

// Missing Data Error Logger
export async function uploadDocumentImage__v0_2__MissingDataError() {
  void logger.logError({
    message: 'POST failed - Missing image file or document ID',
    error_code: 'MISSING_DATA_ERROR',
    http_method: 'POST',
  })
}

// Supabase Upload Error Logger
export async function uploadDocumentImage__v0_2__UploadError(uploadError: any) {
  void logger.logError({
    message: uploadError,
    error_code: 'SUPABASE_UPLOAD_ERROR',
    http_method: 'POST',
  })
}

// Document Update Error Logger
export async function uploadDocumentImage__v0_2__DocumentUpdateError(
  documentError: any,
) {
  void logger.logError({
    message: documentError,
    error_code: 'DOCUMENT_UPDATE_ERROR',
    http_method: 'POST',
  })
}

// Performance Success Logger
export async function uploadDocumentImage__v0_2__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'Image POST executed successfully',
    http_method: 'POST',
    execution_time: Math.round(end - start),
  })
}
