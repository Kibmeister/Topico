const UploadFile = require('./upload.js').UploadFile
const path = require('path')

UploadFile.UploadFile(path.join(__dirname, '/temp/tempFile.wav'))
console.log('Attempting upload from: ', __dirname, '/temp/tempFile.wav')
