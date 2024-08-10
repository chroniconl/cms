// Every 24 hours, this endpoint will be hit
// It will send an email to the contact form owner

import { Resend } from 'resend'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { UnreadNotifications } from '../../../../../components/email/UnreadNotifications'
import {
  legalDocumentCreate__v0_1__AuthError,
  legalDocumentCreate__v0_1__DatabaseError,
  legalDocumentCreate__v0_1__PerformanceSuccess,
} from './loggingActions'

const resend = new Resend(process.env.RESEND_KEY)

export async function GET(request) {
  const start = performance.now()
  const { error: supabaseError, count } = await supabase
    .from('contact_form')
    .select('*', { count: 'exact' })
    .eq('internal__status', 'UNSEEN')

  if (supabaseError) {
    void legalDocumentCreate__v0_1__DatabaseError(supabaseError)
    return failResponse(supabaseError.message)
  }

  if (count === 0) {
    const end = performance.now()
    void legalDocumentCreate__v0_1__PerformanceSuccess(start, end)
    return okResponse('No unread forms')
  }

  const { error } = await resend.emails.send({
    from: 'info@noreply.chroniconl.com',
    to: process.env.ADMIN_EMAIL,
    subject:
      'You have ' +
      count +
      ' unread user-submitted forms that need your attention.',
    react: (
      <UnreadNotifications
        url="https://chroniconl.com/dashboard/form-submissions"
        count={count}
      />
    ),
  })

  if (error) {
    void legalDocumentCreate__v0_1__AuthError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void legalDocumentCreate__v0_1__PerformanceSuccess(start, end)
  return okResponse('Email sent')
}
