const http = require('http')
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3002

const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.json({ hola: 'Mundo' })
})

server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
