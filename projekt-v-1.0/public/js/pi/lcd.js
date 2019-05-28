'use strict'
const LCD = require('lcdi2c')

const lcd1 = new LCD(1, 0x27, 16, 2)
const lcd2 = new LCD(1, 0x26, 16, 2)
const lcd3 = new LCD(1, 0x25, 16, 2)
const lcd4 = new LCD(1, 0x24, 16, 2)
const lcdChain = [lcd1, lcd2, lcd3, lcd4]

class LCDclass {
  // clears all LCDs
  static clearAll () {
    lcdChain.forEach(function (lcd) {
      lcd.clear()
    })
  }
}

module.exports.LCDclass = LCDclass
