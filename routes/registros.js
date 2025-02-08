const express = require('express')
const router = express.Router()
const database = require('../config/db')

router.get('/apellidos', async (req, res) => {
  const { apellidoPaterno, apellidoMaterno } = req.query

  const paterno = `%${apellidoPaterno}%`
  const materno = `%${apellidoMaterno}%`

  try {
    const [result] = await database.query(
      `SELECT numero_registro, dni, nombre, apellidoPaterno, apellidoMaterno, sexo, 
      DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento, telefono
      FROM registros WHERE apellidoPaterno LIKE ? AND apellidoMaterno LIKE ?`,
      [paterno, materno]
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

router.get('/dni', async (req, res) => {
  const { DNI } = req.query

  const documento = `%${DNI}%`

  try {
    const [result] = await database.query(
      `SELECT numero_registro, dni, nombre, apellidoPaterno, apellidoMaterno, sexo, 
      DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento, telefono
      FROM registros WHERE dni LIKE ?`, [documento])
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

module.exports = router
