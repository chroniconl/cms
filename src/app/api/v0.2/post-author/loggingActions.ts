import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.2.post-author.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function postAuthor__v0_2__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function postAuthor__v0_2__ValidationError(validationError: any) {
  void logger.logError({
    message: validationError,
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
  })
}

// Database Error Logger
export async function postAuthor__v0_2__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function postAuthor__v0_2__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully: ',
    execution_time: Math.round(end - start),
    url: '/api/v0.2/post-author',
    http_method: 'PUT',
  })
}
