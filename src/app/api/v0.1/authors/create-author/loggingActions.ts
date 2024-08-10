import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.authors.create-author.POST'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Authentication Error Logger
export async function createAuthor__v0_1__AuthError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Validation Error Logger
export async function createAuthor__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function createAuthor__v0_1__DatabaseError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// Performance Success Logger
export async function createAuthor__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/authors/create-author',
    http_method: 'POST',
  })
}
