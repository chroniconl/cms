import Logger from '@/utils/logger'

const loggerName = 'api.v0.2.post-title.PUT'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Validation Error Logger
export async function postTitle__v0_2__ValidationError(
  validationError: any,
  request: Request,
) {
  void logger.logError({
    message: validationError,
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
  })
}

// Database Error Logger
export async function postTitle__v0_2__DatabaseError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'DATABASE_ERROR',
    http_method: 'PUT',
  })
}

// Performance Success Logger
export async function postTitle__v0_2__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.2/post-title',
    http_method: 'PUT',
  })
}
