'use strict'

var Gpio = require('onoff').Gpio
var pushButton1 = new Gpio(4, 'in', 'rising')

pushButton1.watch(function (err, value) {
  if (err) throw err
  setInterval(_ => console.log(value), 200)
})
