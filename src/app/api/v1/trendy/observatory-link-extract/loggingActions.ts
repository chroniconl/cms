import Logger from '@/utils/logger'

const loggerName = 'api.v1.trendy.observatory-link-extract.POST'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'
const logger = new Logger(loggerName, applicationName, environment)

// Authentication Error Logger
export async function observatoryLinkExtract__v1__AuthError(userError: any) {
  void logger.logError({
    message: JSON.stringify(userError),
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Validation Error Logger
export async function observatoryLinkExtract__v1__ValidationError(
  validationError: any,
) {
  void logger.logError({
    message: JSON.stringify(validationError),
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Trendy API Error Logger
export async function observatoryLinkExtract__v1__TrendyAPIError(
  responseError: any,
) {
  void logger.logError({
    message: JSON.stringify(responseError),
    error_code: 'TRENDY_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function observatoryLinkExtract__v1__DatabaseError(
  trendyError: any,
) {
  void logger.logError({
    message: JSON.stringify(trendyError),
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
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
