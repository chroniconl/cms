import { currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const loggerName = 'server.getCurrentUser'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'

const logger = new Logger(loggerName, applicationName, environment)

/**
 *
 * @returns {Promise<{
 * 	data: {
 * 		id: string
 * 		user_id: string
 * 		provider: string
 * 	}
 * 	error: any
 * }>} userData
 */
export async function getCurrentUser() {
  const user = await currentUser()

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user?.id)
    .single()

  if (userError) {
    void logger.logError({
      message:
        'getCurrentUser failed - Error fetching user' + userError.message,
      error_code: 'E001',
      exception_type: 'Error',
    })
    throw new Error('Error fetching user')
  }

  return {
    data: userData,
    error: userError,
  }
}
