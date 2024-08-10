import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.trending.GET'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Validation Error Logger
export async function trending__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'VALIDATION_ERROR',
    http_method: 'GET',
  })
}

// Database Error Logger
export async function trending__v0_1__DatabaseError(supabaseError: any) {
  void logger.logError({
    message: JSON.stringify(supabaseError),
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
