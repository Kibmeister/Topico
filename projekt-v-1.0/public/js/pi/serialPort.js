const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 })
const parser = port.pipe(new Readline({ delimiter: '\n' }))
var a = 0
var b = 0

// Read the port data
port.on('open', () => {
  console.log('serial port open')
})

setInterval(() => {
  if (b === 1) {
    a = 1
    serialPort.sendData(a)
  }
  if (b === 6) {
    a = 4
    serialPort.sendData(a)
  }
  if (b === 13) {
    a = 8
    serialPort.sendData(a)
  }
  console.log('b is' + b)
  console.log('a is' + a)
  b++
}, 2000)

class serialPort {
  static sendData (a) {
    port.write(a + '\n', (err) => {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written')
    })
  }
}

parser.on('data', data => {
  console.log('got word from arduino:', data)
})

module.exports.serialPort = serialPort
