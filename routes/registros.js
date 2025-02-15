const express = require('express')
const router = express.Router()
const database = require('../config/db')

// Busqueda por apellidos
router.get('/apellidos', async (req, res) => {
  const { apellidoPaterno, apellidoMaterno } = req.query

  const paterno = `%${apellidoPaterno}%`
  const materno = `%${apellidoMaterno}%`

  try {
    const [result] = await database.query(
      `SELECT id, numero_registro, dni, nombre, apellidoPaterno, apellidoMaterno, sexo, 
      DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento, telefono
      FROM registros WHERE apellidoPaterno LIKE ? AND apellidoMaterno LIKE ?`,
      [paterno, materno]
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// Busqueda por DNI
router.get('/dni', async (req, res) => {
  const { DNI } = req.query

  const documento = `%${DNI}%`

  try {
    const [result] = await database.query(
      `SELECT id, numero_registro, dni, nombre, apellidoPaterno, apellidoMaterno, sexo, 
      DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento, telefono
      FROM registros WHERE dni LIKE ?`, [documento])
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// Obtener datos del paciente por ID
router.get('/paciente/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await database.query('SELECT dni, telefono FROM registros WHERE id = ?', [id])
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// Actualizar datos del paciente
router.patch('/paciente/:id', async (req, res) => {
  const { id } = req.params
  const { dni, telefono } = req.body
  try {
    const [result] = await database.query('UPDATE registros SET dni = ?, telefono= ? WHERE id = ?',
      [dni, telefono, id])

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Paciente no encontrado' })
    }

    res.json({ message: 'Paciente actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

module.exports = router
