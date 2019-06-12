'use strict'

var Gpio = require('onoff').Gpio
// var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 1000 })
// Output is sent 1 second after button is released

var pushButton1 = new Gpio(4, 'in', 'falling', { debounceTimeout: 1000 })

pushButton1.watch(function (err, value) {
  if (err) throw err
  console.log(value)
})
