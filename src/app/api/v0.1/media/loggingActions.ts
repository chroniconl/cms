import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'api.v0.1.media.GET',
  httpMethod: 'GET',
})

// Fetch Media Error Logger
export async function media__v0_1__FetchMediaError(error: any) {
  void logger.logError({
    message: error,
    error_code: 'UPLOADTHING_MEDIA_FETCH_ERROR',
    http_method: 'GET',
  })
}

// Performance Success Logger
export async function media__v0_1__PerformanceSuccess(
  start: number,
  end: number,
) {
  void logger.logPerformance({
    message: 'GET executed successfully',
    execution_time: Math.round(end - start),
    url: '/api/v0.1/media',
    http_method: 'GET',
  })
}
