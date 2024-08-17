import { supabase } from '@/utils/supabase'

type LogData = {
  message?: any
  error_code?: string
  exception_type?: string
  stack_trace?: string
  execution_time?: number
  cpu_usage?: number
  memory_usage?: number
  response_time?: number
  user_id?: string
  session_id?: string
  request_id?: string
  ip_address?: string
  url?: string
  http_method?: string
  service_name?: string
  hostname?: string
  thread_id?: string
  correlation_id?: string
  custom_field_1?: string
  custom_field_2?: string
  log_level: string
}

class Logger {
  constructor(
    private options: {
      name: string
      environment?: string
      httpMethod?: string
      url?: string
    },
  ) {}

  private async logToDatabase(logData: LogData) {
    const { error: insertError } = await supabase.from('__raw_logs').insert({
      ...logData,
      timestamp: new Date(),
      logger_name: this.options.name,
      application_name: 'Chroniconl',
      environment: this.options.environment
        ? this.options.environment
        : (process.env.NODE_ENV as string) || 'development',
      http_method: this.options.httpMethod,
      url: this.options.url,
    })

    if (insertError) {
      console.error('Error logging to Supabase:', insertError.message)
    }
  }

  async logError(options: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...options,
      message: JSON.stringify(options.message),
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logPerformance(performanceData: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...performanceData,
      // TODO remove message: '',
      // Set during refactor to intentionally avoid logging message data as we
      // refactor the logging system
      message: '',
      log_level: 'PERFORMANCE',
    }

    await this.logToDatabase(logData)
  }

  async logInfo(infoData: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...infoData,
      log_level: 'INFO',
    }

    await this.logToDatabase(logData)
  }

  async logChatGpt(infoData: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...infoData,
      log_level: 'CHATGPT',
    }

    await this.logToDatabase(logData)
  }

  // ERROR LOGGERS
  async logDatabaseError(
    error: any,
    additionalLogData?: Omit<LogData, 'log_level' | 'message'>,
  ) {
    const logData: LogData = {
      ...additionalLogData,
      message: JSON.stringify(error),
      error_code: 'DATABASE_ERROR',
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logAuthError(
    error: any,
    additionalLogData?: Omit<LogData, 'log_level' | 'message'>,
  ) {
    const logData: LogData = {
      ...additionalLogData,
      message: JSON.stringify(error),
      error_code: 'AUTH_ERROR',
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logValidationError(
    error: any,
    additionalLogData?: Omit<LogData, 'log_level' | 'message'>,
  ) {
    const logData: LogData = {
      ...additionalLogData,
      message: JSON.stringify(error),
      error_code: 'VALIDATION_ERROR',
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logGeneralError(
    error: any,
    additionalLogData?: Omit<LogData, 'log_level' | 'message'>,
  ) {
    const logData: LogData = {
      ...additionalLogData,
      message: JSON.stringify(error),
      error_code: 'GENERAL_ERROR',
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logUploadThingError(
    error: any,
    additionalLogData?: Omit<LogData, 'log_level' | 'message'>,
  ) {
    const logData: LogData = {
      ...additionalLogData,
      message: JSON.stringify(error),
      error_code: 'UPLOADTHING_MEDIA_FETCH_ERROR',
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }
}

export default Logger
