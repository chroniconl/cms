import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.document.delete.DELETE',
  httpMethod: 'DELETE',
})

// Authentication Error Logger
export async function documentDelete__v0__AuthError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'AUTH_ERROR',
    http_method: 'DELETE',
  })
}

// Database Error Logger
export async function documentDelete__v0__DatabaseError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'DATABASE_ERROR',
    http_method: 'DELETE',
  })
}

// Performance Success Logger
export async function documentDelete__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'DELETE executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document/delete',
    http_method: 'DELETE',
  })
}
