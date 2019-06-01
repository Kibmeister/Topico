'use strict'
const mysql = require('mysql')

let config = {
  user: 'pi',
  password: 'foobar',
  database: 'itpdp',
  dateStrings: true
}
// dateStrings: true is necessary as there's a bug in js mysql dates otherwise.

const pool = mysql.createPool(config)

pool.getConnection(function (err, connection) {
  if (err) throw err

  // Create table Words
  connection.query(
    `CREATE TABLE IF NOT EXISTS Words(
      word VARCHAR(16) PRIMARY KEY,
      queword1 VARCHAR(16),
      queword2 VARCHAR(16),
      queword3 VARCHAR(16)
    )`, (err) => {
      if (err) throw err
    }
  )

  // Create table Recording
  connection.query(
    `CREATE TABLE IF NOT EXISTS Recording (
      recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      word VARCHAR(40) REFERENCES Words(word),
      path VARCHAR(200)
    )`, (err) => {
      if (err) throw err
    }
  )

  connection.release()
})

module.exports = pool
