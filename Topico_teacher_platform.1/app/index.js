'use strict'

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Words = require('../db/words').Words

// Test variables:
let dataWords = []
let dataRecordings = []

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
// app.get('/groups', (request, response, next) => {
//   if (request.accepts('application/json') && !request.accepts('text/html')) {
//     Words.wordsGUIQuery((err, res) => {
//       if (err) throw err
//       Array.prototype.push.apply(dataWords, res)
//     })
//     console.log('Words data: ', dataWords)
//     Words.recordingsGUIQuery((err, res) => {
//       if (err) throw err
//       Array.prototype.push.apply(dataRecordings, res)
//     }).then((response) => {
//       console.log('Recordings data: ', dataRecordings)
//       let GUIdata = []
//       dataWords.forEach(wordEntry => {
//         dataRecordings.forEach(recording => {
//           if (recording.word === wordEntry.word) {
//             GUIdata.add({ word: wordEntry.word, queword1: wordEntry.queword1, queword2: wordEntry.queword2, queword3: wordEntry.queword3, path: recording.rpath })
//           }
//         })
//       })
//       console.log(GUIdata)
//     })
//   } else {
//     response.render('index')
//   }
// })

app.get('/groups', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    Words.wordsGUIQuery((err, res) => {
      if (err) throw err
      Array.prototype.push.apply(dataWords, res)
      Words.recordingsGUIQuery((err, res2) => {
        if (err) throw err
        Array.prototype.push.apply(dataRecordings, res2)
        let GUIdata = res
        GUIdata.forEach(function (GUIEntry) {
          GUIEntry.path = []
          dataRecordings.forEach(function (recordingEntry) {
            if (GUIEntry.word === recordingEntry.word) {
              GUIEntry.path.push(recordingEntry.rpath)
            }
            console.log(GUIdata)
          })
        })
      })
    })
  }
})

// save a mainword with three following quewords to the db
// app.post('/spawnPool', (request, response, next) => {
//   const spawn = {
//     add_mainWord: request.body.mainWord,
//     add_queWord1: request.body.helpWord1,
//     add_queWord2: request.body.helpWord2,
//     add_queWord3: request.body.helpWord3
//   }
//   console.log(spawn)
//   Words.add(spawn, (err, spawn) => {
//     if (err) return next(err)
//     response.render('index')
//   })
// })
app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
