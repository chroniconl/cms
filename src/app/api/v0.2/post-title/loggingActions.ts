import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.2.post-title.PUT',
  httpMethod: 'PUT',
})

// Validation Error Logger
export async function postTitle__v0_2__ValidationError(
  error: any,
  request: Request,
) {
  void logger.logValidationError(error)
}

// Database Error Logger
export async function postTitle__v0_2__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function postTitle__v0_2__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'PUT executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.2/post-title',
    http_method: 'PUT',
  })
}
