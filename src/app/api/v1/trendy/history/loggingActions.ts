import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v1.trendy.history.GET',
  httpMethod: 'GET',
})

// Authentication Error Logger
export async function trendyHistory__v1__AuthError(userError: any) {
  void logger.logError({
    message: userError,
    error_code: 'AUTH_ERROR',
    http_method: 'GET',
  })
}

// Database Error Logger
export async function trendyHistory__v1__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function trendyHistory__v1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v1/trendy/history',
    http_method: 'GET',
  })
}
