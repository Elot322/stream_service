import express from 'express'
import cors from 'cors'
import logger from 'morgan'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

const Port = process.env.Port || 8080

app.listen(Port, () => {
  console.log('Server run!')
  console.log(`http://localhost:${Port}`)
})