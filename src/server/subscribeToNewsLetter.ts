'use server'
import { supabase } from '@/utils/supabase'
import { redirect } from 'next/navigation'
import Logger from '@/utils/logger'

const loggerName = 'server.getCurrentUser'
const applicationName = 'chroniconl'
const environment = (process.env.NODE_ENV as string) || 'development'

const logger = new Logger(loggerName, applicationName, environment)

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
			message:
				'handleSubscribeToNewsletterFormSubmit failed - Error inserting newsletter subscriber' +
				error.message,
			error_code: 'E001',
			exception_type: 'Error',
		})
		// TODO: Add error message
		return
	}

	redirect('/thank-you?newsletter=true')
}
