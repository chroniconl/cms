import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.document.image-delete.DELETE',
  httpMethod: 'DELETE',
})

// Authentication Error Logger
export async function imageDelete__v0__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger for Missing Document ID
export async function imageDelete__v0__MissingDocumentIDError() {
  void logger.logError({
    message: JSON.stringify({ message: 'Document ID is required' }),
    error_code: 'VALIDATION_ERROR',
    http_method: 'DELETE',
  })
}

// Validation Error Logger for Missing Image ID
export async function imageDelete__v0__MissingImageIDError() {
  void logger.logError({
    message: JSON.stringify({ message: 'Image ID is required' }),
    error_code: 'VALIDATION_ERROR',
    http_method: 'DELETE',
  })
}

// UploadThing Deletion Error Logger
export async function imageDelete__v0__UploadThingError() {
  void logger.logDatabaseError({
    message: "Image wasn't deleted. Please contact support.",
  })
}

// Database Error Logger
export async function imageDelete__v0__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function imageDelete__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'DELETE executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/image-delete',
    http_method: 'DELETE',
  })
}
