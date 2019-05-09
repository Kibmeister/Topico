const http = require('http')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const express = require('express')

const app = express()
const httpServer = http.createServer(app)

const PORT = process.env.PORT || 8080

httpServer.listen(8080, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// put the HTML file containing your form in a directory named 'public' (relative to where this script is located)
app.get('/', express.static(path.join(__dirname, './index')))

const handleError = (err, res) => {
  if (err) throw err
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!')
}

const upload = multer({
  dest: '/path/to/temporary/directory/to/store/uploaded/files'
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
})

app.post(
  '/upload',
  upload.single('file' /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path
    const targetPath = path.join(__dirname, './uploads/image.png')

    if (path.extname(req.file.originalname).toLowerCase() === '.png') {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res)

        res
          .status(200)
          .contentType('text/plain')
          .end('File uploaded!')
      })
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res)

        res
          .status(403)
          .contentType('text/plain')
          .end('Only .png files are allowed!')
      })
    }
  }
)
