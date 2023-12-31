const apiKey = process.env.GETIMGAI_API_KEY
const apiUrl = process.env.GETIMGAI_API_URL

export async function GET() {
  if (!apiKey || !apiUrl) {
    return Response.json({
      status: 500,
      message: 'No key or url on the server'
    })
  }

  const response = await fetch(`${apiUrl}/account/balance`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  })

  const data = await response.json()

  return Response.json({ status: 200, data })
}
