import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v1.trendy.observatory-action.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function observatoryAction__v1__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function observatoryAction__v1__ValidationError(error: any) {
  void logger.logValidationError(error)
}

// Trendy API Error Logger
export async function observatoryAction__v1__TrendyAPIError(
  responseError: any,
) {
  void logger.logError({
    message: responseError,
    error_code: 'TRENDY_ERROR',
    exception_type: 'Error',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function observatoryAction__v1__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function observatoryAction__v1__PerformanceSuccess(
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

export async function observatoryAction__v1__StructuredDataError(
  responseError: any,
) {
  void logger.logError({
    message: responseError,
    error_code: 'GPT_DATA_ERROR',
    exception_type: 'Error',
    http_method: 'POST',
  })
}

export async function observatoryAction__v1__StructuredDataSuccess(
  response: any,
) {
  void logger.logPerformance({
    message: response,
  })
}
