const mysql = require('mysql2/promise')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = require('./env')

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10
})

module.exports = pool
