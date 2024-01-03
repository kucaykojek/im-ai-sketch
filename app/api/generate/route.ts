import { NextResponse } from 'next/server'

const apiUrl = process.env.API_URL
const disableGeneration = true

export async function POST(req: Request) {
  const headers = new Headers()
  headers.set('Content-Type', 'image/*')

  if (!apiUrl) {
    return new NextResponse(null, { status: 500, headers })
  }

  if (disableGeneration) {
    return new NextResponse(null, { status: 500, headers })
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

  return new NextResponse(blob, { status: 200, headers })
}
