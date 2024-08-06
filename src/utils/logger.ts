import { supabase } from '@/utils/supabase'

type LogErrorOptions = {
  error_code?: 'VALIDATION_ERROR' | 'DATABASE_ERROR' | string
  exception_type?: string
  stack_trace?: string
  message: string
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
  log_level?: string
}

type PerformanceData = {
  message: string
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
}

class Logger {
  constructor(
    private loggerName: string,
    private applicationName: string,
    private environment: string,
  ) {}

  async logError(data?: LogErrorOptions) {
    const logData = {
      timestamp: new Date(),
      message: data?.message,
      logger_name: this.loggerName,
      application_name: this.applicationName,
      environment: this.environment,
      error_code: data?.error_code || '',
      exception_type: data?.exception_type || '',
      stack_trace: data?.stack_trace || '',
      execution_time: data?.execution_time || 0,
      cpu_usage: data?.cpu_usage || 0,
      memory_usage: data?.memory_usage || 0,
      response_time: data?.response_time || 0,
      user_id: data?.user_id || '',
      session_id: data?.session_id || '',
      request_id: data?.request_id || '',
      ip_address: data?.ip_address || '',
      url: data?.url || '',
      http_method: data?.http_method || '',
      service_name: data?.service_name || '',
      hostname: data?.hostname || '',
      thread_id: data?.thread_id || '',
      correlation_id: data?.correlation_id || '',
      custom_field_1: data?.custom_field_1 || '',
      custom_field_2: data?.custom_field_2 || '',
      log_level: 'ERROR',
    }

    const { error: insertError } = await supabase
      .from('__raw_logs')
      .insert(logData)

    if (insertError) {
      console.error('Error logging to Supabase:', insertError.message)
    }
  }

  async logPerformance(performanceData: PerformanceData) {
    const logData = {
      timestamp: new Date(),
      message: performanceData.message,
      logger_name: this.loggerName,
      application_name: this.applicationName,
      environment: this.environment,
      error_code: performanceData.error_code || '',
      exception_type: performanceData.exception_type || '',
      stack_trace: performanceData.stack_trace || '',
      execution_time: performanceData.execution_time || 0,
      cpu_usage: performanceData.cpu_usage || 0,
      memory_usage: performanceData.memory_usage || 0,
      response_time: performanceData.response_time || 0,
      user_id: performanceData.user_id || '',
      session_id: performanceData.session_id || '',
      request_id: performanceData.request_id || '',
      ip_address: performanceData.ip_address || '',
      url: performanceData.url || '',
      http_method: performanceData.http_method || '',
      service_name: performanceData.service_name || '',
      hostname: performanceData.hostname || '',
      thread_id: performanceData.thread_id || '',
      correlation_id: performanceData.correlation_id || '',
      custom_field_1: performanceData.custom_field_1 || '',
      custom_field_2: performanceData.custom_field_2 || '',
      log_level: 'PERFORMANCE',
    }

    const { error: insertError } = await supabase
      .from('__raw_logs')
      .insert(logData)

    if (insertError) {
      console.error('Error logging to Supabase:', insertError.message)
    }
    console.log('logPerformance executed successfully')
  }
}

export default Logger
