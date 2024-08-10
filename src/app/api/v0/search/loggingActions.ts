import Logger from '@/utils/logger'

const loggerName = 'api.v0.search.POST'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Authentication Error Logger
export async function search__v0__AuthError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Validation Error Logger
export async function search__v0__ValidationError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// General Error Logger
export async function search__v0__GeneralError(message: string) {
  void logger.logError({
    message: JSON.stringify({ message }),
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger for Title Search
export async function search__v0__TitleSearchError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger for Content Search
export async function search__v0__ContentSearchError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// Performance Success Logger
export async function search__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/search',
    http_method: 'POST',
  })
}
