import { NextResponse } from 'next/server'

const apiUrl = process.env.API_URL

export async function POST(req: Request) {
  if (!apiUrl) {
    return Response.json({
      status: 500,
      message: 'No key or url on the server'
    })
  }

  const { image, prompt, strength } = await req.json()

  const response = await fetch(`${apiUrl}/img2img`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      image_b64: image,
      prompt,
      strength,
      negative_prompt: '',
      guidance_scale: 1,
      steps: 4,
      seed: 1,
      accept: 'image/jpeg'
    })
  })

  const blob = await response.blob()

  const headers = new Headers()

  headers.set('Content-Type', 'image/*')

  return new NextResponse(blob, { status: 200, headers })
}
