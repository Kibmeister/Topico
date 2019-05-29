'use strict'

const mic = require('mic')
const fs = require('fs')

var micInstance = mic({
  device: 'plughw:0,0',
  fileType: 'wav',
  rate: '44100',
  channels: '1',
  debug: false,
  exitOnSilence: 6
})
var micInputStream = micInstance.getAudioStream()
var outputFileStream = fs.WriteStream('voice2.wav')

class micClass {
  static startRecording () {
    micInstance.start()
  }
  static stopRecording () {
    micInstance.stop()
  }
}

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
  }, 20000)
})

module.exports.micClass = micClass
