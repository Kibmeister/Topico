'use strict'
const mysql = require('mysql')

let config = {
  user: 'pi',
  password: 'foobar',
  database: 'itpdp',
  host: '192.168.43.31'
}

const pool = mysql.createPool(config)

pool.getConnection((err, connection) => {
  if (err) return (err)

  // Create table Words
  connection.query(
    `CREATE TABLE IF NOT EXISTS Words(
      word VARCHAR(16) PRIMARY KEY,
      queword1 VARCHAR(16),
      queword2 VARCHAR(16),
      queword3 VARCHAR(16)
    );`, (err) => {
      if (err) throw err
    }
  )

  // Create table Recording
  connection.query(
    `CREATE TABLE IF NOT EXISTS Recordings (
      recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      word VARCHAR(16) REFERENCES Words(word),
      rpath VARCHAR(200)
    );`, (err) => {
      if (err) throw err
    }
  )

  connection.release()
})

module.exports = pool
