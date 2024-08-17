import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.document.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function document__v0__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Database Error Logger
export async function document__v0__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function document__v0__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/document',
    http_method: 'PUT',
  })
}
