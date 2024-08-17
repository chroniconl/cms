import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.2.create-author.PUT',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function createAuthor__v0_2__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Validation Error Logger
export async function createAuthor__v0_2__ValidationError(error: any) {
  void logger.logValidationError(error)
}

// Database Error Logger
export async function createAuthor__v0_2__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function createAuthor__v0_2__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.2/create-author',
    http_method: 'POST',
  })
}
