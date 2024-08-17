import Logger from '@/utils/logger'

const fetchData = async () => {
  const logger = new Logger({
    name: 'api.v0.1.media.GET.fetchData',
    httpMethod: 'GET',
  })

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

export async function GET() {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v0.1.media.GET',
    httpMethod: 'GET',
  })

  const data = await fetchData()

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
