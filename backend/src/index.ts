import express from 'express'

const app = express()

const Port = process.env.Port || 8080

app.listen(Port, () => {
  console.log('Server run!')
  console.log(`http://localhost:${Port}`)
})