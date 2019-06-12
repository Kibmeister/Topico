'use strict'

var Gpio = require('onoff').Gpio
var pushButton1 = new Gpio(4, 'out', 'rising', { debounceTimeout: 3000 })

pushButton1.watch(function (err, value) {
  if (err) throw err
  console.log(value)
})
