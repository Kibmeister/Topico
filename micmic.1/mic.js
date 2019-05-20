'use strict'
var mic = require('mic')
var fs = require('fs')

var micInstance = mic({
  device: 'plughw:0,0',
  fileType: 'wav',
  rate: '44100',
  channels: '1',
  debug: true,
  exitOnSilence: 6
})
var micInputStream = micInstance.getAudioStream()

var outputFileStream = fs.WriteStream('voice2.wav')

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
  }, 10000)
})

micInputStream.on('stopComplete', function () {
  console.log('Got SIGNAL stopComplete')
})

micInputStream.on('silence', function () {
  console.log('Got SIGNAL silence')
  micInstance.stop()
})

micInputStream.on('processExitComplete', function () {
  console.log('Got SIGNAL processExitComplete')
})

micInstance.start()
