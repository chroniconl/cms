import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.document.image-upload.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function imageUpload__v0__AuthError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'AUTH_ERROR',
    http_method: 'PUT',
  })
}

// Validation Error Logger for Missing Document ID
export async function imageUpload__v0__MissingDocumentIDError() {
  void logger.logError({
    message: JSON.stringify({ message: 'Document ID is required' }),
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
  })
}

// Validation Error Logger for Missing Image ID
export async function imageUpload__v0__MissingImageIDError() {
  void logger.logError({
    message: JSON.stringify({ message: 'Image ID is required' }),
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
  })
}

// Database Error Logger
export async function imageUpload__v0__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function imageUpload__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/image-upload',
    http_method: 'PUT',
  })
}
