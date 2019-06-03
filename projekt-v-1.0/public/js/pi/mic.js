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

micInputStream.on('data', function (data) {
  console.log('Recieved Input Stream: ' + data.length)
})

micInputStream.on('error', function (err) {
  console.log('Error in Input Stream: ' + err)
})

micInputStream.on('startComplete', function () {
  console.log('Got SIGNAL startComplete')
  setTimeout(function () {
    micInstance.stop()
    console.log('Stopped recording after 20 seconds')
  }, 20000)
})

micInputStream.on('processExitComplete', function () {
  UploadFile.UploadFile(path.join(__dirname, '/temp/tempFile.wav'))
})
module.exports = micInstance
