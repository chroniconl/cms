import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.form-submission.internal-status.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function formSubmissionStatus__v0_1__AuthError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'AUTH_ERROR',
    http_method: 'PUT',
  })
}

// Validation Error Logger
export async function formSubmissionStatus__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
  })
}

// Database Error Logger
export async function formSubmissionStatus__v0_1__DatabaseError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'DATABASE_ERROR',
    http_method: 'PUT',
  })
}

// Performance Success Logger
export async function formSubmissionStatus__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/document/form-submission/internal-status',
    http_method: 'PUT',
  })
}
