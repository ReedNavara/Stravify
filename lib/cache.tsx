import { NextApiResponse } from 'next'

export function setCacheControl(res: NextApiResponse, maxAge: number = 60) {
  res.setHeader(
    'Cache-Control',
    `public, max-age=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  )
}