// Every 24 hours, this endpoint will be hit
// It will send an email to the contact form owner

import { Resend } from 'resend';
import { failResponse, okResponse } from '@/utils/response';
import { supabase } from '@/utils/supabase';
import { UnreadNotifications } from '../../../../../components/email/UnreadNotifications';

const resend = new Resend(process.env.RESEND_KEY);

export async function GET(request) {
	const { error: supabaseError, count } = await supabase
		.from('contact_form')
		.select('*', { count: 'exact' })
		.eq('internal__status', 'UNSEEN')

	if (supabaseError) {
		return failResponse(supabaseError.message)
	}

	const { error } = await resend.emails.send({
		from: 'info@noreply.chroniconl.com',
		to: process.env.ADMIN_EMAIL,
		subject: 'You have ' + count + ' unread user-submitted forms that need your attention.',
		react: <UnreadNotifications url="https://chroniconl.com/dashboard/form-submissions" count={count} />
	})

	if (error) {
		return failResponse(error?.message)
	}

	return okResponse('Email sent')
}