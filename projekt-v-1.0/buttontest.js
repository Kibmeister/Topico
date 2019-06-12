'use strict'

var Gpio = require('onoff').Gpio
var pushButton1 = new Gpio(4, 'in', 'both')

// pushButton1.watch(function (err, value) {
//   if (err) throw err
//   console.log(value)
// })

pushButton1.readSync((err, res) => {
  if (err) throw err
  console.log(res)
})
