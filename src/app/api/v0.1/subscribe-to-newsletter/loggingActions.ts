import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.subscribe-newsletter.POST'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Validation Error Logger
export async function subscribeNewsletter__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger for Duplicate Email
export async function subscribeNewsletter__v0_1__DuplicateEmailError(
  error: any,
) {
  void logger.logError({
    message: error,
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// General Database Error Logger
export async function subscribeNewsletter__v0_1__GeneralDatabaseError(
  error: any,
) {
  void logger.logError({
    message: error,
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// Performance Success Logger
export async function subscribeNewsletter__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/subscribe-to-newsletter',
    http_method: 'POST',
  })
}
