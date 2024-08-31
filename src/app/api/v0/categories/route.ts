import { colorClassNames } from '@/utils/colorClassNames'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'

import Logger from '@/utils/logger'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const logger = new Logger({
    name: 'api.v0.categories.POST',
    request: request,
  })
  const start = performance.now()
  const requestData = await request.json()

  const schema = joi.object({
    name: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void logger.logValidationError(validationError)
    return failResponse(validationError.message)
  }

  const colorValues = Object.keys(colorClassNames)
  const randomColor: string =
    colorValues[Math.floor(Math.random() * colorValues.length)]

  const { data, error } = await supabase
    .from('categories')
    .insert([
      {
        name: requestData.name,
        slug: formatSlug(requestData.name),
        color: randomColor,
      },
    ])
    .select('id, name, slug, color')
    .single()

  if (error) {
    void logger.logDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(data, 'Document category created')
}
