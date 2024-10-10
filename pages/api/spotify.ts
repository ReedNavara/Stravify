import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring'

const client_id = 'myclient_id'
const client_secret = 'myclient_secret'
const redirect_uri = 'https://Stravify-1.reedn84.repl.co/api/spotify?path=callback'

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const TOPLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top'

interface TokenResponse {
  access_token: string
  refresh_token: string
  [key: string]: any
}

const getAccessToken = async (refresh_token: string): Promise<TokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

const getTopItems = async (access_token: string, type: string, time_range: string): Promise<any> => {
  const response = await fetch(`${TOPLISTS_ENDPOINT}/${type}?time_range=${time_range}&limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return response.json()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path, refresh_token, access_token, type, time_range } = req.query

  if (path === 'login') {
    const scope = 'user-top-read'
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      }))
  } else if (path === 'callback') {
    const { code } = req.query
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: redirect_uri,
      }),
    })

    const data: TokenResponse = await response.json()
    const { access_token, refresh_token } = data

    res.redirect(`/?access_token=${access_token}&refresh_token=${refresh_token}`)
  } else if (path === 'refresh_token') {
    const { access_token } = await getAccessToken(refresh_token as string)
    res.status(200).json({ access_token })
  } else if (path === 'get_top_items') {
    const data = await getTopItems(access_token as string, type as string, time_range as string)
    res.status(200).json(data)
  } else {
    res.status(404).json({ error: 'Invalid path' })
  }
}
