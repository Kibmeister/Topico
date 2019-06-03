const UploadFile = require('./upload.js').UploadFile
const path = require('path')
const filepath = path.join(__dirname, '/temp/tempFile.wav')

UploadFile.UploadFile(filepath)
console.log('Attempting upload from: ', __dirname, '/temp/tempFile.wav')
