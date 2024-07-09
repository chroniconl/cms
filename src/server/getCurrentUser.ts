import { currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/utils/supabase'

/**
 *
 * @returns {Promise<any>} userData
 */
export async function getCurrentUser() {
  const user = await currentUser()
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user?.id)
    .single()

  if (userError) {
    throw new Error('Error fetching user')
  }

  return userData
}