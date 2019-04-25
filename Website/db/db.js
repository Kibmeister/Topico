'use strict'
const mysql = require('mysql')

let config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  dateStrings: true
}
// dateStrings: true is necessary as there's a bug in js mysql dates otherwise.

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
}

const pool = mysql.createPool(config)

pool.getConnection((err, connection) => {
  if (err) throw err

  // Create table Class
  connection.query(
    `CREATE TABLE IF NOT EXISTS Class(
      class_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(40) NOT NULL,
      teacher_name VARCHAR(40) NOT NULL
    )`, (err) => {
      if (err) throw err
    }
  )

  // Create table Teams
  connection.query(
    `CREATE TABLE IF NOT EXISTS Teams(
      team_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        team_name VARCHAR(30),
        points INTEGER,
        class_id INTEGER REFERENCES Class(class_id)
    )`, (err) => {
      if (err) throw err
    }
  )

  // Create table Words
  connection.query(
    `CREATE TABLE IF NOT EXISTS Words(
      word_id INTEGER AUTO_INCREMENT PRIMARY KEY,
        class_id INTEGER REFERENCES Class(class_id),
        word VARCHAR(20) NOT NULL
    )`, (err) => {
      if (err) throw err
    }
  )

  // Create table Recording
  connection.query(
    `CREATE TABLE IF NOT EXISTS Recording (
      recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      word VARCHAR(40) REFERENCES Words(word_id),
        path VARCHAR(200)
    )`, (err) => {
      if (err) throw err
    }
  )

  connection.release()
})

module.exports = pool
