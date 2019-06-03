const UploadFile = require('./upload.js').UploadFile
const path = require('path')

UploadFile.UploadFile(path.join(__dirname, 'temp/tempFile.wav'))

// Assumes a server.js is running locally
