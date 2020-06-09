const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const { aws } = require('./lib')

const PORT = process.env.PORT || 3002

const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/token', async (req, res) => {
  try {
    const { registerDeviceToken } = aws()
    const { token } = req.body
    const data = await registerDeviceToken(token)
    res.status(201).json({ data, status: 201 })
  } catch (e) {
    console.warn('e', e)
  }
})

app.post('/arn', async (req, res) => {
  try {
    const { sendPushNofitication } = aws()
    const { arn, message } = req.body
    const data = await sendPushNofitication(message, arn)
    res.status(201).json({ data, status: 201 })
  } catch (e) {
    console.warn('e', e)
  }
})

server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
