import { colorClassNames } from '@/utils/colorClassNames'
import { formatSlug } from '@/utils/formatSlug'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import joi from 'joi'
import {
  categories__v0__GetDatabaseError,
  categories__v0__GetPerformanceSuccess,
  categories__v0__PostValidationError,
  categories__v0__PostDatabaseError,
  categories__v0__PostPerformanceSuccess,
  categories__v0__PutValidationError,
  categories__v0__PutDatabaseError,
  categories__v0__PutPerformanceSuccess,
} from './loggingActions'

export async function GET() {
  const start = performance.now()

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
    void categories__v0__GetDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void categories__v0__GetPerformanceSuccess(start, end)
  return okResponse(data)
}

export async function POST(request: Request) {
  const start = performance.now()
  const requestData = await request.json()

  const schema = joi.object({
    name: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void categories__v0__PostValidationError(validationError)
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
    void categories__v0__PostDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void categories__v0__PostPerformanceSuccess(start, end)
  return okResponse(data, 'Document category created')
}

export async function PUT(request: Request) {
  const start = performance.now()
  const requestData = await request.json()

  const schema = joi.object({
    id: joi.string().required(),
    category_id: joi.string().required(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    void categories__v0__PutValidationError(validationError)
    return failResponse(validationError.message)
  }

  const { error } = await supabase
    .from('categories')
    .update({
      category_id: requestData.category_id,
    })
    .match({ id: requestData.id })

  if (error) {
    void categories__v0__PutDatabaseError(error)
    return failResponse(error?.message)
  }

  const end = performance.now()
  void categories__v0__PutPerformanceSuccess(start, end)
  return okResponse('Documents category was updated')
}
