import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.document.metadata.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function documentMetadata__v0_1__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function documentMetadata__v0_1__ValidationError(error: any) {
  void logger.logValidationError(error)
}

// Database Error Logger
export async function documentMetadata__v0_1__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function documentMetadata__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/document/metadata',
    http_method: 'PUT',
  })
}
