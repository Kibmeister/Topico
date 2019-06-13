'use strict'

const mic = require('mic')
const fs = require('fs')
const UploadFile = require('./upload.js').UploadFile
const path = require('path')

var micInstance = mic({
  device: 'plughw:0,0',
  fileType: 'wav',
  rate: '44100',
  channels: '1',
  debug: false,
  exitOnSilence: 6
})

var micInputStream = micInstance.getAudioStream()
var outputFileStream = fs.WriteStream(path.join(__dirname, '/temp/tempFile.wav'))
micInputStream.pipe(outputFileStream)

micInputStream.on('error', function (err) {
  console.log('Error in Input Stream: ' + err)
})

micInputStream.on('startComplete', function () {
  console.log('Started audio recording')
})

micInputStream.on('processExitComplete', function () {
  UploadFile.UploadFile(path.join(__dirname, '/temp/tempFile.wav'))
})
module.exports = micInstance
