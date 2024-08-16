import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v1.trendy.observatory-action.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function observatoryAction__v1__AuthError(userError: any) {
  void logger.logError({
    message: userError,
    error_code: 'AUTH_ERROR',
    http_method: 'POST',
  })
}

// Validation Error Logger
export async function observatoryAction__v1__ValidationError(
  validationError: any,
) {
  void logger.logError({
    message: validationError.message,
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
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
export async function observatoryAction__v1__DatabaseError(trendyError: any) {
  void logger.logError({
    message: trendyError.message,
    error_code: 'DATABASE_ERROR',
    exception_type: 'Error',
    http_method: 'POST',
  })
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
