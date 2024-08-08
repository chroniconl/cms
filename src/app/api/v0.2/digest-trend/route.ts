import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } },
) {
  try {
    const githubApiUrl = 'https://api.github.com'
    const apiEndpoint = `/repos/${params.owner}/${params.repo}`

    const headers = {
      Authorization: `token ${process.env.GITHUB_PAT}`,
      Accept: 'application/vnd.github.v3+json',
    }

    const response = await fetch(githubApiUrl + apiEndpoint, { headers })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      return new NextResponse(response.statusText, { status: response.status })
    }
  } catch (error: any) {
    return new NextResponse(
      'An error occurred while fetching repository data',
      { status: 500 },
    )
  }
}
