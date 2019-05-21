'use strict'

// Initialize requires:
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const express = require('express')

// Initialize express:
const app = express()

// Start server and print server IP and port:
const PORT = process.env.PORT || 8080
require('http').createServer(app).listen(8080, () => {
  console.log(`Server hosted on ${require('ip').address()}:${PORT}`)
})

// Serve the index file from /public when a user enters ./ in a browser
app.get('/', express.static(path.join(__dirname, './public')))

const handleError = (err, res) => {
  if (err) throw err
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!')
}

const upload = multer({
  dest: '/temp'
})

// Method to handle incoming file uploads:
/*
app.post(
  '/upload',
  upload.single('file'),
  (req, res) => {
    //console.log('Requested file: ', req.file)
    //console.log('Requested file path:', req.path)
    // console.log('Requested file name:', req.name)
    var filePath = path.join(__dirname, req.path)
    fs.writeFileSync(filePath, req.file)
    const targetPath = path.join(__dirname, './uploads/', req.originalname)
    console.log('Requested file: ', req.file)
    const tempPath = req.path

    if (path.extname(req.file.originalname).toLowerCase() === '.wav') {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res)

        res
          .status(200)
      })
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res)

        res
          .status(403)
      })
    }
  }
) */

app.post('/uploadAudio', upload.single('file'), function (req, res) {
  console.log(req)
  let uploadLocation = path.join(__dirname, '/uploads/', req.file.originalname)
  // where to save the file to. make sure the incoming name has a .wav extension
  console.log()
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file))) // write the blob to the server as a file
  res.sendStatus(200) // send back that everything went ok
})
