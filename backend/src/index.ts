import express from 'express'
import cors from 'cors'
import logger from 'morgan'

import streamRouter from './modules/stream/stream.controller'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/stream', streamRouter)

const Port = process.env.Port || 8080

app.listen(Port, () => {
  console.log('Server run!')
  console.log(`http://localhost:${Port}`)
})