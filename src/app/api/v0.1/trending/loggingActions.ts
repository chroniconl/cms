import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.trending.GET',
  httpMethod: 'GET',
})

// Validation Error Logger
export async function trending__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'VALIDATION_ERROR',
    http_method: 'GET',
  })
}

// Database Error Logger
export async function trending__v0_1__DatabaseError(supabaseError: any) {
  void logger.logError({
    message: supabaseError,
    error_code: 'DATABASE_ERROR',
    http_method: 'GET',
  })
}

// Performance Success Logger
export async function trending__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/trending',
    http_method: 'GET',
  })
}
