import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.document.filterable-data.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function filterableData__v0_1__AuthError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Validation Error Logger
export async function filterableData__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function filterableData__v0_1__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function filterableData__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/document/filterable-data',
    http_method: 'POST',
  })
}
