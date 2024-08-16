import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.document.create.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function documentCreate__v0__AuthError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function documentCreate__v0__DatabaseError(error: any) {
  void logger.logError({
    message: error,
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
