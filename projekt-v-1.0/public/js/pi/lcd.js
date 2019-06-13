'use strict'
const LCD = require('lcdi2c')

const lcd1 = new LCD(1, 0x25, 16, 2)
const lcd2 = new LCD(1, 0x27, 16, 2)
const lcd3 = new LCD(1, 0x23, 16, 2)
const lcd4 = new LCD(1, 0x26, 16, 2)
const lcdChain = [lcd1, lcd2, lcd3, lcd4]

class LCDClass {
  // Writes identical text to all LCD screens
  static writeToAll (text, line) {
    lcdChain.forEach(function (lcd) {
      lcd.println(text, line)
    })
  }
  // Clears all LCD screens:
  static clearAll () {
    lcdChain.forEach(function (lcd) {
      lcd.clear()
    })
    console.log('Cleared all LCDs')
  }
  // Turns off all screens:
  static turnAllOff () {
    LCDClass.clearAll()
    lcdChain.forEach(function (lcd) {
      lcd.off()
    })
  }
}

module.exports.LCDClass = LCDClass
exports.lcd1 = lcd1
exports.lcd2 = lcd2
exports.lcd3 = lcd3
exports.lcd4 = lcd4
