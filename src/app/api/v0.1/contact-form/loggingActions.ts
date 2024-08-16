import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.contact-form.POST',
  httpMethod: 'POST',
})

// Validation Error Logger
export async function contactForm__v0_1__ValidationError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'VALIDATION_ERROR',
    http_method: 'POST',
  })
}

// Database Error Logger
export async function contactForm__v0_1__DatabaseError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'DATABASE_ERROR',
    http_method: 'POST',
  })
}

// Performance Success Logger
export async function contactForm__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/contact-form',
    http_method: 'POST',
  })
}
