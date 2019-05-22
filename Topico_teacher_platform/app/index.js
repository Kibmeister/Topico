'use strict'

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Words = require('../db/words').Words

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (request, response, next) => {
  response.redirect('/index')
})
// find most recent registered values in database
app.get('/index', (request, response, next) => {
  response.render('index')
})
// #1 Get one pool of words
app.get('/groups', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    Words.wordsGUIQuery((err, dataWords) => {
      if (err) return next(err)
      response.contentType('application/json')
      response.end(JSON.stringify(dataWords))
      /* loop that inputs main word from word table into Recordings table and
      writes in the terminal, every rpath to the following main word */
      for (let i = 0; i < dataWords.length; i++) {
        // const word = 'bridge'
        Words.recordingsGUIQuery(dataWords[i].word, (err, recordings) => {
          if (err) throw err
          // console.log(recordings.length)
          for (let j = 0; j < recordings.length; j++) {
            console.log('dataword ' + dataWords[i].word)
            console.log('recording ' + recordings[3])
            if (dataWords[i].word === recordings[j].word) {
              console.log(recordings[j].rpath)
            }
          }
          // response.end(JSON.stringify(recordings))
        })
      }
      // response.contentType('application/json')
    })
  } else {
    response.render('index')
  }
})

// Return recordings for a word
app.get('/grouprecordings', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    Words.recordingsGUIQuery((err, recordings) => {
      if (err) throw err
      response.contentType('application.json')
      response.end(JSON.stringify(recordings))
    })
  } else {
    response.render('index')
  }
})
app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
