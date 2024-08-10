import { supabase } from '@/utils/supabase'

type LogData = {
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
  log_level: string
}

class Logger {
  constructor(
    private loggerName: string,
    private applicationName: string,
    private environment: string,
  ) {}

  private async logToDatabase(logData: LogData) {
    const { error: insertError } = await supabase.from('__raw_logs').insert({
      ...logData,
      timestamp: new Date(),
      logger_name: this.loggerName,
      application_name: this.applicationName,
      environment: this.environment,
    })

    if (insertError) {
      console.error('Error logging to Supabase:', insertError.message)
    }
  }

  async logError(options: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...options,
      log_level: 'ERROR',
    }

    await this.logToDatabase(logData)
  }

  async logPerformance(performanceData: Omit<LogData, 'log_level'>) {
    const logData: LogData = {
      ...performanceData,
      log_level: 'PERFORMANCE',
    }

    await this.logToDatabase(logData)
  }
}

export default Logger
