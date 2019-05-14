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

// put the HTML file containing your form in a directory named 'public' (relative to where this script is located)
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
app.post(
  '/upload',
  upload.single('file'),
  (req, res) => {
    console.log('Requested file: ', req.file)
    const tempPath = req.file.path
    const targetPath = path.join(__dirname, './uploads/test.wav')

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
)
