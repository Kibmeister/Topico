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

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (request, response, next) => {
  response.redirect('/index')
})

app.get('/index', (request, response, next) => {
  response.render('index')
})
// #1 Get one pool of words
app.get('/groups', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    Words.wordsGUIQuery((err, res) => {
      if (err) throw err
      let dataWords = []
      Array.prototype.push.apply(dataWords, res)
      Words.recordingsGUIQuery((err, res2) => {
        if (err) throw err
        let dataRecordings = []
        Array.prototype.push.apply(dataRecordings, res2)
        let GUIdata = res
        GUIdata.forEach(function (GUIEntry) {
          GUIEntry.path = []
          dataRecordings.forEach(function (recordingEntry) {
            if (GUIEntry.word === recordingEntry.word) {
              GUIEntry.path.push(recordingEntry.rpath)
            }
          })
        })
        // console.log(GUIdata)
        response.end(JSON.stringify(GUIdata))
      })
    })
  }
})
// #2 Save a mainword with three following quewords to the db
app.post('/index', (request, response, next) => {
  const spawn = {
    word: request.body.main,
    queWord1: request.body.help1,
    queWord2: request.body.help2,
    queWord3: request.body.help3
  }
  console.log(spawn)
  Words.add(spawn, (err, spawn) => {
    if (err) return next(err)
    response.redirect('/index')
  })
})
// #3 Get one pair of mainword and voicerecording
app.get('/dictionary', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    Words.recordingsGUIQuery((err, data) => {
      if (err) return next(err)
      response.contentType('application/json')
      response.end(JSON.stringify(data))
    })
  } else {
    response.render('index')
  }
})

app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
