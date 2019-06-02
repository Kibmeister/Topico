'use strict'
const LCD = require('lcdi2c')

const lcd1 = new LCD(1, 0x27, 16, 2)
const lcd2 = new LCD(1, 0x26, 16, 2)
const lcd3 = new LCD(1, 0x25, 16, 2)
const lcd4 = new LCD(1, 0x23, 16, 2)
const lcdChain = [lcd1, lcd2, lcd3, lcd4]

class LCDClass {
  // clears all LCDs
  static clearAll () {
    lcdChain.forEach(function (lcd) {
      lcd.clear()
    })
    console.log('Cleared all LCDs')
  }
  static turnAllOff () {
    LCDClass.clearAll()
    lcdChain.forEach(function (lcd) {
      lcd.off()
    })
  }
}

module.exports.LCDClass = LCDClass
module.exports.lcd1 = lcd1
module.exports.lcd2 = lcd2
module.exports.lcd3 = lcd3
module.exports.lcd4 = lcd4
