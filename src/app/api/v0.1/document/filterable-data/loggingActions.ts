import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.document.filterable-data.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function filterableData__v0_1__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function filterableData__v0_1__ValidationError(error: any) {
  void logger.logValidationError(error)
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
