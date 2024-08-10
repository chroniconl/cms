import Logger from '@/utils/logger'

const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'

// GET Categories Logger
const loggerGetName = 'api.v0.categories.GET'
const loggerGet = new Logger(loggerGetName, applicationName, environment)
export async function categories__v0__GetDatabaseError(error: any) {
  void loggerGet.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'GET',
  })
}
export async function categories__v0__GetPerformanceSuccess(
  start: number,
  end: number,
) {
  void loggerGet.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/categories',
    http_method: 'GET',
  })
}

// POST Categories Logger
const loggerPostName = 'api.v0.categories.POST'
const loggerPost = new Logger(loggerPostName, applicationName, environment)
export async function categories__v0__PostValidationError(error: any) {
  void loggerPost.logError({
    message: JSON.stringify(error),
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}
export async function categories__v0__PostDatabaseError(error: any) {
  void loggerPost.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}
export async function categories__v0__PostPerformanceSuccess(
  start: number,
  end: number,
) {
  void loggerPost.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/categories',
    http_method: 'POST',
  })
}

// PUT Categories Logger
const loggerPutName = 'api.v0.categories.PUT'
const loggerPut = new Logger(loggerPutName, applicationName, environment)
export async function categories__v0__PutValidationError(error: any) {
  void loggerPut.logError({
    message: JSON.stringify(error),
    error_code: 'VALIDATION_ERROR',
    http_method: 'PUT',
  })
}
export async function categories__v0__PutDatabaseError(error: any) {
  void loggerPut.logError({
    message: JSON.stringify(error),
    error_code: 'DATABASE_ERROR',
    http_method: 'PUT',
  })
}
export async function categories__v0__PutPerformanceSuccess(
  start: number,
  end: number,
) {
  void loggerPut.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0/categories',
    http_method: 'PUT',
  })
}
