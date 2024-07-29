import Logger from '@/utils/logger'

const loggerName = 'api.v0.1.document.image-metadata.PUT'
const applicationName = 'chroniconl'
const environment = process.env.NODE_ENV as string || 'development'
const logger = new Logger(loggerName, applicationName, environment)

const fetchData = async () => {
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
    throw new Error('Failed to fetch media')
  }

  const data = await response.json()

  return data
}

export async function GET() {
	const start = performance.now();
  const data = await fetchData()

	const end = performance.now();
	void logger.logPerformance({
		message: 'GET executed successfully',
		execution_time: Math.round(end - start),
		url: '/api/v0.1/document/image-upload',
		http_method: 'GET'
	});
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
