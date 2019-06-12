'use strict'

var Gpio = require('onoff').Gpio
var pushButton1 = new Gpio(4, 'in', 'both', { debounceTimeout: 20 })

pushButton1.watch(function (err, value) {
  if (err) throw err
  if (value === 1) {
    console.log(value)
  }
})
