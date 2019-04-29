'use strict'
var Sound = require('node-arecord')

var sound = new Sound({
  debug: true, // Show stdout
  destination_folder: '/tmp',
  filename: '/home/pi/filename.wav',
  alsa_format: 'dat',
  alsa_device: 'plughw:1,0'
})

sound.record()
console.log('recording started')

setTimeout(function () {
  sound.pause() // pause the recording after five seconds
}, 5000)

setTimeout(function () {
  sound.resume() // and resume it two seconds after pausing
}, 7000)

setTimeout(function () {
  sound.stop() // stop after ten seconds
}, 10000)
