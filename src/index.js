const express = require('express')
const database = require('./db')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.set('port', process.env.PORT)
app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'))
})

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://sistema.clinica-flores.com/']
}))

app.get('/registros', async (req, res) => {
  const { apellidoPaterno, apellidoMaterno } = req.query

  const paterno = apellidoPaterno ? `%${apellidoPaterno}%` : '%'
  const materno = apellidoMaterno ? `%${apellidoMaterno}%` : '%'

  try {
    const connection = await database.getConnection()
    const result = await connection.query('SELECT * FROM registros WHERE apellidoPaterno LIKE ? AND apellidoMaterno LIKE ?', [paterno, materno])
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})
