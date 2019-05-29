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
