'use strict'

var Gpio = require('onoff').Gpio

var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 1000 })
// Output is sent 1s after releasing the button
var pushButton2 = new Gpio(14, 'in', 'falling', { debounceTimeout: 5000 })
// Output is sent after holding the button for 5 seconds

pushButton1.watch(function (err, value) {
  if (err) throw err
  console.log('Pushbutton1: ', value)
})

pushButton2.watch(function (err, value) {
  if (err) throw err
  console.log('Pushbutton 2: ', value)
})
