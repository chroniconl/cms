'use server'
import { supabase } from '@/utils/supabase'
import { redirect } from 'next/navigation'
import Logger from '@/utils/logger'

const logger = new Logger({
  name: 'server.subscribeToNewsletter',
  httpMethod: 'GET',
})

export async function handleSubscribeToNewsletterFormSubmit(
  formData: FormData,
) {
  const email = formData.get('email-address')

  if (!email) {
    return
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: email,
  })

  if (error) {
    logger.logError({
      message: error,
      error_code: 'SUBSCRIBE_TO_NEWSLETTER_ERROR',
    })
    // TODO: Add error message
    return
  }

  redirect('/thank-you?newsletter=true')
}
