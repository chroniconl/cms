import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.legal-document-manager.contact-form-submission.POST',
  httpMethod: 'POST',
})

// Authentication Error Logger
export async function legalDocumentCreate__v0_1__AuthError(error: any) {
  void logger.logAuthError(error)
}

// Database Error Logger
export async function legalDocumentCreate__v0_1__DatabaseError(error: any) {
  void logger.logDatabaseError(error)
}

// Performance Success Logger
export async function legalDocumentCreate__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'POST executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/document/create',
    http_method: 'POST',
  })
}
