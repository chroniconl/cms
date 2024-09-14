import { supabase } from '@/utils/supabase'
import { NextRequest } from 'next/server'

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
      // @deprecated use request instead
      httpMethod?: string
      url?: string
      request?: NextRequest
      user_id?: string
      session_id?: string
    },
  ) {}

  private async logToDatabase(logData: LogData) {
    const { error: insertError } = await supabase.from('__raw_logs').insert({
      ...logData,
      // @ts-ignore
      timestamp: new Date(),
      logger_name: this.options.name,
      application_name: 'Chroniconl',
      environment: this.options.environment
        ? this.options.environment
        : (process.env.NODE_ENV as string) || 'development',
      http_method: this.options.request?.method || this.options.httpMethod,
      url: this.options.url,
      ip_address: this.options.request?.ip || null,
      request_headers: JSON.stringify(this.options.request?.headers) || null,
      request_geo: JSON.stringify(this.options.request?.geo) || null,
      request_cookies: JSON.stringify(this.options.request?.cookies) || null,
      nextUrl: this.options.request?.nextUrl || null,
      user_id: this.options.user_id || null,
      session_id: this.options.session_id || null,
    })

    if (insertError) {
      console.error('Error logging to Supabase:', insertError.message)
    }
  }

  async setUserId(userId: string) {
    this.options.user_id = userId
  }

  async setSessionId(sessionId: string) {
    this.options.session_id = sessionId
  }

  async logError(options: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...options,
      message: JSON.stringify(options.message),
      error_code: options.error_code,
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logPerformance(performanceData: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...performanceData,
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
