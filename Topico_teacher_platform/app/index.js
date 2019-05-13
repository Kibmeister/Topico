'use strict'

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Measurments = require('../db/db').Measurments

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

// find all registered values in database and pass it as a string
app.get('/measurment', (request, response, next) => {
  if (request.accepts('application/json') && !request.accepts('text/html')) {
    const latest = request.query.latest
    if (latest) {
      Measurments.find((err, data) => {
        if (err) return next(err)
        response.contentType('application/json')
        response.end(JSON.stringify(data))
      })
    } else {
      Measurments.all((err, dataA) => {
        if (err) return next(err)
        response.contentType('application/json')
        response.end(JSON.stringify(dataA))
      })
    }
  } else {
    response.render('index')
  }
})
// find most recent registered values in database
app.get('/index', (request, response, next) => {
  response.render('index')
})
app.get('/wordpool', (request, response, next) => {
  response.redirect('/index')
})

app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
