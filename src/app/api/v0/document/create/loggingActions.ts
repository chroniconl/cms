import Logger from '@/utils/logger'

const loggerName = 'api.v0.document.create.POST'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Authentication Error Logger
export async function documentCreate__v0__AuthError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function documentCreate__v0__DatabaseError(error: any) {
  void logger.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// General Error Logger
export async function documentCreate__v0__GeneralError(message: string) {
  void logger.logError({
    message: JSON.stringify({ message }),
    error_code: 'GENERAL_ERROR',
    http_method: 'POST',
  })
}

// Performance Success Logger
export async function documentCreate__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/create',
    http_method: 'POST',
  })
}
