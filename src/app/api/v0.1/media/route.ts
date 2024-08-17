import { getCurrentUser } from '@/server/getCurrentUser'
import Logger from '@/utils/logger'
import { failResponse } from '@/utils/response'
import { NextRequest } from 'next/server'

const fetchData = async (request: NextRequest) => {
  const logger = new Logger({
    name: 'api.v0.1.media.GET.fetchData',
    request: request,
  })

  const { data: userData, error: userError } = await getCurrentUser()
  if (userError) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  if (!process.env.UPLOADTHING_SECRET) {
    return
  }

  const response = await fetch('https://uploadthing.com/api/listFiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET,
      'X-Uploadthing-Version': '6.4.0',
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    void logger.logGeneralError(response)
    throw new Error('Failed to fetch media')
  }

  const data = await response.json()

  return data
}

export async function GET(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.1.media.GET',
    request: request,
  })

  const data = await fetchData(request)

  const end = performance.now()
  logger.logPerformance({
    execution_time: Math.round(end - start),
  })

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
