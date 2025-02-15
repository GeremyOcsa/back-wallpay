const express = require('express')
const cors = require('cors')
const registros = require('./routes/registros')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: ['https://sistema.clinica-flores.com', 'http://127.0.0.1:5500', 'https://geremyocsa.github.io'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}))

app.use(express.json())
app.use('/', registros)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
