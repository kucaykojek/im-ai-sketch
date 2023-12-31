const apiKey = process.env.GETIMGAI_API_KEY
const apiUrl = process.env.GETIMGAI_API_URL

const requestOpts = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
}
export async function POST(req: Request) {
  if (!apiKey || !apiUrl) {
    return Response.json({
      status: 500,
      message: 'No key or url on the server'
    })
  }

  const { image, prompt, strength } = await req.json()

  const response = await fetch(apiUrl, {
    ...requestOpts,
    body: JSON.stringify({
      image,
      prompt,
      strength
    })
  })

  const data = await response.json()

  return Response.json({ status: 200, data })
}
