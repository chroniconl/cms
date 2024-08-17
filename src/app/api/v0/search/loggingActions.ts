import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.search.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function search__v0__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function search__v0__ValidationError(error: any) {
  void logger.logError({
    message: error,
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
  void logger.logDatabaseError(error)
}

// Database Error Logger for Content Search
export async function search__v0__ContentSearchError(error: any) {
  void logger.logDatabaseError(error)
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
