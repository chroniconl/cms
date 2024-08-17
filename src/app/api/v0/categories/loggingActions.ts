import Logger from '@/utils/logger'

// GET Categories Logger
const loggerGet = new Logger({
  name: 'api.v0.categories.GET',
  httpMethod: 'GET',
})

export async function categories__v0__GetDatabaseError(error: any) {
  void loggerGet.logDatabaseError(error)
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
const loggerPost = new Logger({
  name: 'api.v0.categories.POST',
  httpMethod: 'POST',
})
export async function categories__v0__PostValidationError(error: any) {
  void loggerPost.logValidationError(error)
}
export async function categories__v0__PostDatabaseError(error: any) {
  void loggerPost.logDatabaseError(error)
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
const loggerPut = new Logger({
  name: 'api.v0.categories.PUT',
  httpMethod: 'PUT',
})
export async function categories__v0__PutValidationError(error: any) {
  void loggerPut.logValidationError(error)
}
export async function categories__v0__PutDatabaseError(error: any) {
  void loggerPut.logDatabaseError(error)
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
