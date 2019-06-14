const SerialPort = require('./public/js/pi/serialPort.js').serialPort

SerialPort.sendData(1)

setTimeout(function () {
  SerialPort.sendData(2)
}, 2000)

setTimeout(function () {
  SerialPort.sendData(3)
}, 4000)

setTimeout(function () {
  SerialPort.sendData(4)
}, 6000)

setTimeout(function () {
  SerialPort.sendData(5)
}, 8000)

setTimeout(function () {
  SerialPort.sendData(6)
}, 10000)

setTimeout(function () {
  SerialPort.sendData(7)
}, 12000)

setTimeout(function () {
  SerialPort.sendData(8)
}, 14000)

setTimeout(function () {
  SerialPort.sendData(9)
}, 16000)

setTimeout(function () {
  SerialPort.sendData(10)
}, 18000)
