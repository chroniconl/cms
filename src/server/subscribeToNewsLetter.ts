'use server'
import { supabase } from '@/utils/supabase'
import { redirect } from 'next/navigation'

export async function handleSubscribeToNewsletterFormSubmit(
  formData: FormData,
) {
  const email = formData.get('email-address')

  if (!email) {
    return
  }

  const { data, error } = await supabase.from('newsletter_subscribers').insert({
    email: email,
  })

  if (error) {
    // TODO: Add error message
    return
  }

  redirect('/thank-you?newsletter=true')
}
