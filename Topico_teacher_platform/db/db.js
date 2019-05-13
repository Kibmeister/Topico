// Initializes the database
const mysql = require('mysql')

const pool = mysql.createPool({
  user: 'pi',
  password: 'foobar',
  database: 'itwot'
})

// Sets up an 'entries' table where entries are assigned an ID as a primary key('id' attribute),
// A topic entry ('entry_topic'), a description('entry_description'), a keyword
pool.getConnection((err, connection) => {
  if (err) throw err
  connection.query(
    `CREATE TABLE IF NOT EXISTS measurments
          (time_stamp TIMESTAMP NOT NULL DEFAULT NOW() PRIMARY KEY,
          temp_value INT(5),
          hum_value INT(5))`, (err) => {
      if (err) throw err
    })
  connection.release()
})

// Sets up static methods for querying the entries table from the itwot database
class Measurments {
  // Returns all blog entries in the database in reverse chronological order
  static all (callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM measurments ORDER BY time_stamp DESC LIMIT 100', (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
    })
  }

  // Find a specific blog entry from it's primary key('id')
  static find (callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM measurments ORDER BY time_stamp DESC LIMIT 1', (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
    })
  }
  // Find a specific  number of temperature readings from the primary key('time_stamp)
  // this function is by pt. not used on the client side
  static since (callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('SELECT * FROM measurments WHERE UNIX_TIMESTAMP(time) > time_stamp = ?', (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
    })
  }

  // Creates a new entry in the entries table
  static create (reading, callback) {
    const sql = 'INSERT INTO measurments (temp_value, hum_value) VALUES (?, ?)'
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(sql, [reading.temp_value, reading.hum_value], (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
    })
  }

  // Deletes the entry with the specified id as primary key, or returns an error.
  static delete (id, callback) {
    if (!id) {
      return callback(new Error('Please provide an id'))
    }
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query('DELETE FROM measurments WHERE id = ?', [id], (err, results, fields) => {
        callback(err, results)
        connection.release()
      })
    })
  }
}

// Sets up methods for querying the authors table

module.exports = pool
module.exports.Measurments = Measurments
