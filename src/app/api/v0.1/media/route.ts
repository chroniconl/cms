import {
  media__v0_1__FetchMediaError,
  media__v0_1__PerformanceSuccess,
} from './loggingActions'

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
    void media__v0_1__FetchMediaError(response)
    throw new Error('Failed to fetch media')
  }

  const data = await response.json()

  return data
}

export async function GET() {
  const start = performance.now()
  const data = await fetchData()

  const end = performance.now()
  void media__v0_1__PerformanceSuccess(start, end)

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
