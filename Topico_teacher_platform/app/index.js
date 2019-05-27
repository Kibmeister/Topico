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
      let lydarray = []
      let dataToSend = { // variable that hold a name and an array of objects
        name: 'dataWords',
        dataWords: dataWords
      }
      // response.send(JSON.stringify(dataToSend))
      // console.log('dette er hele word poolen ' + JSON.stringify(dataToSend))
      /* loop that inputs main word from word table into Recordings table and
      writes in the terminal, every rpath to the following main word */
      for (let i = 0; i < dataWords.length; i++) {
        // console.log(dataWords[i])
        Words.recordingsGUIQuery(dataWords[i].word, (err, recordings) => {
          if (err) return next(err)
          for (let j = 0; j < recordings.length; j++) {
            if (dataWords[i].word === recordings[j].word) {
              let lydstreng = recordings[j]
              // console.log(recordings[j])
              // add lydstreng til array
              dataToSend = [{ // variable that hold a name and an array of objects
                name: 'dataWords',
                dataWords: dataWords
              }, {
                name: 'lydstreng',
                lydstreng: lydstreng
              }]

              lydarray.push(dataToSend)
            }
          }
        })
      }
      response.end(JSON.stringify(dataToSend))
      console.log('dette er lydStreng og mainword' + JSON.stringify(dataToSend))
    })
  } else {
    response.render('index')
  }
})
// save a mainword with three following quewords to the db
app.post('/spawnPool', (request, response, next) => {
  const spawn = {
    add_mainWord: request.body.mainWord,
    add_queWord1: request.body.helpWord1,
    add_queWord2: request.body.helpWord2,
    add_queWord3: request.body.helpWord3
  }
  console.log(spawn)
  Words.add(spawn, (err, spawn) => {
    if (err) return next(err)
    response.render('index')
  })
})
app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
