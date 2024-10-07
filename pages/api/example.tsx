import { NextApiRequest, NextApiResponse } from 'next'
import { setCacheControl } from '@/lib/cache'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCacheControl(res, 3600) // Cache for 1 hour

  res.status(200).json({ name: 'John Doe' })
}