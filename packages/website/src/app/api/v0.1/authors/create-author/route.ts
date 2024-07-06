import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import { currentUser } from '@clerk/nextjs/server'
import joi from 'joi'

export async function POST(request: Request) {
  const user = await currentUser()

  if (!user) {
    return failResponse('User not found')
  }

  // Check if the user exists in the database
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user?.id)
    .single()

  if (userError) {
    return failResponse('Trouble getting user')
  }
  const requestData = await request.json()

  const schema = joi.object({
    name: joi.string().required(),
    link_to: joi.string().required(),
    avatar_url: joi.string().optional(),
    avatar_id: joi.string().optional(),
  })

  const { error: validationError } = schema.validate(requestData)

  if (validationError) {
    return failResponse(validationError.message)
  }

  const { data, error } = await supabase
    .from('authors')
    .insert({
      display_name: requestData?.name,
      href: requestData?.link_to,
      avatar_url: requestData?.avatar_url,
      avatar_id: requestData?.avatar_id,
      created_by: userData?.id,
    })
    .select()

  if (error) {
    console.error(error, 'Error creating author')
    return failResponse(error?.message)
  }

  return okResponse(data, 'Avatar created')
}
