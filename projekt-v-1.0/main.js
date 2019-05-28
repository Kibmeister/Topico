'use strict'
var Gpio = require('onoff').Gpio
var mic = require('mic')
var fs = require('fs')
const LCDclass = require('./public/js/pi/lcd').LCDclass
var LCD = require('lcdi2c')
var lcd1 = new LCD(1, 0x27, 16, 2)
var lcd2 = new LCD(1, 0x26, 16, 2)
var lcd3 = new LCD(1, 0x25, 16, 2)
var lcd4 = new LCD(1, 0x24, 16, 2)
let lcdChain = [lcd1, lcd2, lcd3, lcd4]
const wordpool = require('./db/words').Words
var myWords = wordpool.getWords(wordpool, (err, wordpool) => {
  if (err) console.log(err)
})
let queWords = []
var chosenWord
var word1 = 'word1'
var word2 = 'word2'
var word3 = 'word3'
var word4 = 'word4'
var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 20 })
var pushButton2 = new Gpio(6, 'in', 'rising', { debounceTimeout: 20 })
var fase = 0

// lcd1.clear()
// lcd2.clear()
// lcd3.clear()
// lcd4.clear()
LCDclass.clearAll()

var micInstance = mic({
  device: 'plughw:0,0',
  fileType: 'wav',
  rate: '44100',
  channels: '1',
  debug: true,
  exitOnSilence: 6
})
var micInputStream = micInstance.getAudioStream()

var outputFileStream = fs.WriteStream('voice2.wav')

pushButton1.watch(function (err, value) {
  console.log(value)
  if (err) throw err
  console.log('Button is pushed!')
  fase++
  initiator()
})

function initiator () {
  console.log('state of the fase is: ', fase)
  if (fase === 1) {
    words()
  }
  if (fase === 3) {
    choose()
  }
  if (fase === 5) {
    queWord()
  }
  if (fase === 7) {
    startRecording()
  }
  if (fase === 8) {
    micInstance.stop()
  }
}

function words () {
  console.log('Stage 1')
  var roundsWords = myWords
  word1 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word1), 1)
  console.log('--')
  lcd1.println(word1, 1)
  console.log('--')
  word2 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word2), 1)
  lcd2.println(word2, 1)
  console.log('--')
  word3 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word3), 1)
  lcd3.println(word3, 1)
  console.log('--')
  word4 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word4), 1)
  lcd4.println(word4)
  console.log('--')
  fase++
}

function choose () {
  console.log('stage 2')
  var word = [word1, word2, word3, word4]
  // adding the LED to make shit happen
  chosenWord = word[Math.floor(Math.random() * word.length)]
  if (chosenWord === word1) {
    lcd3.clear()
    lcd2.clear()
    lcd4.clear()
    lcd1.println('you got:', 1)
    lcd1.println(word1, 2)
    lcdChain = [lcd1, lcd2, lcd3, lcd4]
  }
  if (chosenWord === word2) {
    lcd3.clear()
    lcd1.clear()
    lcd4.clear()
    lcd2.println('you got:', 1)
    lcd2.println(word2, 2)
    lcdChain = [lcd2, lcd3, lcd4, lcd1]
  }
  if (chosenWord === word3) {
    lcd1.clear()
    lcd2.clear()
    lcd4.clear()
    lcd3.println('you got:', 1)
    lcd3.println(word3, 2)
    lcdChain = [lcd3, lcd4, lcd1, lcd2]
  }
  if (chosenWord === word4) {
    lcd1.clear()
    lcd2.clear()
    lcd3.clear()
    lcd4.println('you got:', 1)
    lcd4.println(word3, 2)
    lcdChain = [lcd4, lcd1, lcd2, lcd3]
  }
  fase++
}

function queWord () {
  console.log('quewords is initiated')
  queWords = wordpool.getQueWords(chosenWord)

  setTimeout(() => {
    lcdChain.indexOf(1).clear()
    lcdChain.indexOf(1).println(queWords.indexOf(0), 2)
    console.log('Q1')
  }, 10000)
  setTimeout(() => {
    lcdChain.indexOf(2).clear()
    lcdChain.indexOf(2).println(queWords.indexOf(1), 2)
    console.log('Q2')
  }, 20000)
  setTimeout(() => {
    lcdChain.indexOf(3).clear()
    lcdChain.indexOf(3).println(queWords.indexOf(2), 2)
    console.log('Q3')
  }, 30000)
  clearTimeout()
  fase++
}

function startRecording () {
  pushButton2.watch(function (err, value) {
    if (err) throw err
    if (fase === 7) {
      micInstance.start()
    }
  })
  micInstance.stop()
}

micInputStream.pipe(outputFileStream)

micInputStream.on('data', function (data) {
  console.log('Recieved Input Stream: ' + data.length)
})

micInputStream.on('error', function (err) {
  console.log('Error in Input Stream: ' + err)
})

micInputStream.on('startComplete', function () {
  console.log('Got SIGNAL startComplete')
  setTimeout(function () {
    micInstance.stop()
  }, 20000)
})

micInputStream.on('stopComplete', function () {
  console.log('Got SIGNAL stopComplete')
  lcd1.clear()
  lcd1.println('Want to try again?', 1)
  lcd2.clear()
  lcd2.println('Want to try again?', 1)
  lcd3.clear()
  lcd3.println('Want to try again?', 1)
  lcd4.clear()
  lcd4.println('Want to try again?', 1)
})

/* micInputStream.on('silence', function () {
  console.log('Got SIGNAL silence')
  micInstance.stop()
}) */

micInputStream.on('processExitComplete', function () {
  console.log('Got SIGNAL processExitComplete')
})

process.on('SIGINT', function () {
  clearInterval()
  lcdChain.forEach(function (i) {
    i.off()
  })
  process.nextTick(function () { process.exit(0) })
})
