'use strict'
const db = require('./db')

/*
CREATE TABLE IF NOT EXISTS Words(
    word VARCHAR(16) PRIMARY KEY,
    queword1 VARCHAR(16),
    queword2 VARCHAR(16),
    queword3 VARCHAR(16)
)
*/

class Words {
  // Adds a word
  static add (word, queword1, queword2, queword3, callback) {
    const sql = 'INSERT INTO words(word, queword1, queword2, queword3) VALUES (?, ?, ?, ?)'
    db.getConnection((err, connection) => {
      connection.query(sql, [word, queword1, queword2, queword3], (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
      if (err) throw err
    })
  }
  // Returns words and their mainwords
  static getWords (callback) {
    const sql = 'SELECT word FROM words'
    db.getConnection((err, connection) => {
      connection.query(sql, (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
      if (err) throw err
    })
  }
  // Returns the quewords of a word
  static getQueWords (word, callback) {
    const sql = 'SELECT queword1, queword2, queword3 FROM words WHERE word = ?'
    db.getConnection((err, connection) => {
      connection.query(sql, [word], (err, results, field) => {
        callback(err, results)
        connection.release()
      })
      if (err) throw err
    })
  }
  // Returns words and paths to display in the GUI
  static wordsGUIQuery (callback) {
    const sql = 'SELECT word, queword1, queword2, queword3 FROM Words;'
    db.getConnection((err, connection) => {
      connection.query(sql, (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
      if (err) throw err
    })
  }
  static recordingsGUIQuery (word, callback) {
    const sql = 'SELECT recordings.rpath FROM recordings WHERE recordings.word = ?;'
    db.getConnection((err, connection) => {
      connection.query(sql, [word], (err, results, field) => {
        callback(err, results)
        connection.release()
      })
      if (err) throw err
    })
  }
}

module.exports.Words = Words
