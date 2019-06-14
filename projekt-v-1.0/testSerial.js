const SerialPort = require('./public/js/pi/serialPort.js').serialPort

SerialPort.sendData(1)

setTimeout(function () {
  SerialPort.sendData(2)
}, 2000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(3)
}, 4000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(4)
}, 6000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(5)
}, 8000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(6)
}, 10000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(7)
}, 12000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(8)
}, 14000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(9)
}, 16000)
clearTimeout()

setTimeout(function () {
  SerialPort.sendData(10)
}, 18000)
clearTimeout()
