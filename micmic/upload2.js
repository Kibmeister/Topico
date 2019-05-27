const UploadFile = require('./upload.js').UploadFile
const path = require('path')

UploadFile.UploadFile(path.join(__dirname, 'voice2.wav'))
