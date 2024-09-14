import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'SERVER_GET_CURRENT_USER',
  httpMethod: 'GET',
})

/**
 *
 * @returns {Promise<{
 * 	data: {
 * 		id: string
 * 		user_id: string
 * 		provider: string
 *    session_id: string
 * 	}
 * 	error: any
 * }>} userData
 */
export async function getCurrentUser() {
  const user = await auth()

  if (user?.userId === null) {
    void logger.logAuthError('No user found')

    return {
      data: null,
      error: 'No user found',
    }
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user?.userId)
    .single()

  if (
    userError ||
    userData === null ||
    userData.user_id === null ||
    user.sessionId === null
  ) {
    void logger.logError({
      message: 'getCurrentUser failed - Error fetching user',
      error_code: JSON.stringify(userError),
    })
    throw new Error('Error fetching user')
  }

  return {
    data: {
      ...userData,
      session_id: user?.sessionId,
    },
    error: userError,
  }
}
