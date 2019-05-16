'use strict'
const db = require('./db')

class Recordings {
  // Add a new recording entry
  static add (word, rpath, callback) {
    const sql = 'INSERT INTO recordings(word, rpath) VALUES (?, ?)'
    db.getConnection((err, connection) => {
      connection.query(sql, [word, rpath], (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
      if (err) throw err
    })
  }
}

module.exports.Recordings = Recordings
