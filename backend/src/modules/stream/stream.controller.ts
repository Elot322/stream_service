import { Router, Request, Response } from 'express'
import WebTorent from 'webtorrent'

const router = Router()
const client = new WebTorent()

let state = {

}

router.get('/home', (req: Request, res: Response) => {
  res.status(200).send({
    hello: 'World'
  })
})

export default router
