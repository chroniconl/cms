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
  const data = await fetchData()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
