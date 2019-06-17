const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 })
const parser = port.pipe(new Readline({ delimiter: '\n' }))

// Read the port data
port.on('open', () => {
  console.log('serial port open')
})

class serialPort {
  static sendData (a) {
    console.log('Writing value to SerialPort: ', a)
    port.write(a + '\n', function (err) {
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

process.on('SIGINT', function () {
  SerialPort.sendData(11)
  process.nextTick(function () { process.exit(0) })
})
