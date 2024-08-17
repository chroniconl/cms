import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v1.trendy.observatory-link-extract.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function observatoryLinkExtract__v1__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function observatoryLinkExtract__v1__ValidationError(
  validationError: any,
) {
  void logger.logError({
    message: validationError,
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Trendy API Error Logger
export async function observatoryLinkExtract__v1__TrendyAPIError(
  responseError: any,
) {
  void logger.logError({
    message: responseError,
    error_code: 'TRENDY_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function observatoryLinkExtract__v1__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function observatoryLinkExtract__v1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v1/trendy',
    http_method: 'POST',
  })
}
