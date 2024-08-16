import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.2.post-description.PUT',
  httpMethod: 'PUT',
})

// Validation Error Logger
export async function postDescription__v0_2__ValidationError(
  validationError: any,
  request: Request,
) {
  void logger.logError({
    message: validationError,
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
    session_id: request.headers.get('x-clerk-session-id') || '',
    user_id: request.headers.get('x-clerk-user-id') || '',
    ip_address: request.headers.get('x-forwarded-for') || '',
  })
}

// Database Error Logger
export async function postDescription__v0_2__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function postDescription__v0_2__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.2/post-description',
    http_method: 'PUT',
  })
}
