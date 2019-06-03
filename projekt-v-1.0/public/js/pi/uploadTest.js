const UploadFile = require('./upload.js').UploadFile

UploadFile.UploadFile(__dirname, '/temp/tempFile.wav')
console.log('Attempting upload from: ', __dirname, '/temp/tempFile.wav')
// Assumes a server.js is running locally
