import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

const schema = joi.object({
  email: joi.string().required(),
})

export async function POST(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.1.subscribe-newsletter.POST',
    request: request,
  })

  const requestData = await request.json()

  const { error: validationError } = schema.validate(requestData)
  if (validationError) {
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: requestData.email,
  })

  if (error?.code === '23505') {
    void logger.logGeneralError(error)
    return failResponse('Email already subscribed')
  } else if (error) {
    void logger.logDatabaseError(error)
    return failResponse('Something went wrong')
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse('You have successfully subscribed to our newsletter.')
}
