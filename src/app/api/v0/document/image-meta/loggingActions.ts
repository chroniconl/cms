import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.document.image-metadata.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function imageMetadata__v0__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger for Missing Document ID
export async function imageMetadata__v0__MissingDocumentIDError() {
  void logger.logValidationError({ message: 'Document ID is required' })
}

// Database Error Logger
export async function imageMetadata__v0__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function imageMetadata__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/image-metadata',
    http_method: 'PUT',
  })
}
