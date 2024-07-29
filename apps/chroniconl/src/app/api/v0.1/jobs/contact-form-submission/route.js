// Every 24 hours, this endpoint will be hit
// It will send an email to the contact form owner

import { Resend } from 'resend'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { UnreadNotifications } from '../../../../../components/email/UnreadNotifications'

const resend = new Resend(process.env.RESEND_KEY)
import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV || 'development'
const logger = new Logger(loggerName, applicationName, environment)

export async function GET(request) {
	const start = performance.now();
  const { error: supabaseError, count } = await supabase
    .from('contact_form')
    .select('*', { count: 'exact' })
    .eq('internal__status', 'UNSEEN')

  if (supabaseError) {
		void logger.logError({
			message: 'GET failed - Error getting contact forms' + supabaseError.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(supabaseError.message)
  }

	if (count === 0) {
		const end = performance.now();
		void logger.logPerformance({
			message: 'GET executed successfully with no unread forms',
			execution_time: Math.round(end - start),
			url: '/api/v0.1/jobs/contact-form-submission',
			http_method: 'GET'
		});
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
		void logger.logError({
			message: 'GET failed - Error sending email' + error.message,
			error_code: 'E001',
			exception_type: 'Error',			
		})
    return failResponse(error?.message)
  }

	const end = performance.now();
	void logger.logPerformance({
		message: 'GET executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0.1/jobs/contact-form-submission',
		http_method: 'GET'
	});
  return okResponse('Email sent')
}
