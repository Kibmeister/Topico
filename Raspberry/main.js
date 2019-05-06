var Sound = require('node-arecord')

var recording = new Sound({
  destination_folder: '/tmp',
  filename: '/path/to/the/file/filename.wav',
  alsa_format: 'dat',
  alsa_device: 'plughw:1,0'
})
