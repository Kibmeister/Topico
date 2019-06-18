'use strict'
var Gpio = require('onoff').Gpio

// Class constants
const UploadFile = require('./public/js/pi/upload.js')
const UploadFileClass = UploadFile.UploadFile
const WordsClass = require('./db/words').Words
const micInstance = require('./public/js/pi/mic')
const SerialPort = require('./public/js/pi/serialPort.js').serialPort

// LCD constants
const LCD = require('./public/js/pi/lcd')
const LCDClass = LCD.LCDClass
const lcd1 = LCD.lcd1
const lcd2 = LCD.lcd2
const lcd3 = LCD.lcd3
const lcd4 = LCD.lcd4

// Words variables
let chosenWord = { word: 'chosenWord', lcd: 'chosenLCD' }
var wordIndex
var word1 = 'word1'
var word2 = 'word2'
var word3 = 'word3'
var word4 = 'word4'
var delay

// Object containing screens and corresponding words
let fourWords = [
  { word: word1, lcd: lcd1 },
  { word: word2, lcd: lcd2 },
  { word: word3, lcd: lcd3 },
  { word: word4, lcd: lcd4 }]

let wordQuewords = []
var printHelpWords1, printHelpWords2, printHelpWords3

var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 1000 })
// Output is sent 1s after releasing the button
var pushButton2 = new Gpio(14, 'in', 'rising', { debounceTimeout: 5000, activeLow: true })
// Output is sent after holding the button for 5 seconds
var phase = 1

// Clear screen and print the device is ready:
LCDClass.clearAll()
LCDClass.writeToAll('Press to start.', 1)
SerialPort.sendData(11)

// Prevent button repeated presses:
pushButton1.watch(function (err) {
  if (err) throw err
  initiator()
  phase++
  console.log('Button is pushed, phase: ', phase)
})

pushButton2.watch(function (err) {
  if (err) throw err
  if (phase === 7) {
    phase = 4
    delay = 1; console.log('Delay set to 1')
    console.log('Pushbutton2 set phase to: ', phase)
    SerialPort.sendData(11)
  }
})

// Function to control different stages of the interaction:
function initiator () {
  if (phase === 1) {
    delay = 10000; console.log('Delay set to original')
    words()
  }
  if (phase === 2) {
    SerialPort.sendData(1)
    setTimeout(function () { choose() }, 1500)
  }
  if (phase === 3) {
    queWord()
  }
  if (phase === 4) {
    clearTimeout(printHelpWords1, printHelpWords2, printHelpWords3)
    LCDClass.clearAll()
    LCDClass.writeToAll('Press to record', 1)
    LCDClass.writeToAll(chosenWord.word, 2)
  }
  if (phase === 5) {
    LCDClass.clearAll()
    LCDClass.writeToAll('Press to stop', 2)
    micInstance.start()
    SerialPort.sendData(10)
  }
  if (phase === 6) {
    micInstance.stop()
    SerialPort.sendData(11)
    LCDClass.clearAll()
    LCDClass.writeToAll('Press to save', 1)
    LCDClass.writeToAll('Hold to retry', 2)
  }
  if (phase === 7) {
    UploadFileClass.UploadFile(chosenWord.word)
    LCDClass.clearAll()
    LCDClass.writeToAll('Upload complete!', 1)
    LCDClass.writeToAll('Press to proceed', 2)
  }
  if (phase === 8) {
    LCDClass.clearAll()
    LCDClass.writeToAll('Press to start', 1)
    LCDClass.writeToAll('a new round', 2)
  }
  if (phase === 9) {
    LCDClass.clearAll(1)
    LCDClass.writeToAll('Press to start.', 1)
    setTimeout(function (err) {
      if (err) throw err
      phase = 1
    }, 1000)
  }
  // micInstance.start()
  // setTimeout(() => {
  //   UploadFileClass.UploadFile(chosenWord.word)
  // }, 25000)
  //
  // if (phase === 8) {
  //   micInstance.stop()
  // }
}

// Queries words from database and prints 4 random to the LCDs:
function words () {
  LCDClass.clearAll()
  console.log('words() called')
  WordsClass.getWords(function (err, res) {
    if (err) throw err
    let roundsWords = []
    res.forEach(function (resEntry) {
      roundsWords.push(resEntry.word)
    })
    let allWords = roundsWords
    fourWords.forEach(function (wordlcd) {
      wordlcd.word = roundsWords[Math.floor(Math.random() * allWords.length)]
      roundsWords.splice(allWords.indexOf(wordlcd.word), 1)
      wordlcd.lcd.println(wordlcd.word, 1)
    })
  })
}

// Selects a random word for the participant, clears the other screens.
function choose () {
  console.log('Choose() called')
  wordIndex = Math.floor(Math.random() * fourWords.length)
  chosenWord = fourWords[wordIndex]
  SerialPort.sendData(wordIndex + 2)
  LCDClass.clearAll()
  chosenWord.lcd.println('You got:', 1)
  chosenWord.lcd.println(chosenWord.word, 2)
}

// Rearranges the words object, and prints quewords:
function queWord () {
  console.log('queWord() called')
  SerialPort.sendData(wordIndex + 6)
  WordsClass.getQueWords(chosenWord.word, function (err, res) {
    if (err) return err
    wordQuewords.push(chosenWord)
    wordQuewords.push({ word: res[0].queword1, lcd: fourWords[((wordIndex + 1) % 4)].lcd })
    wordQuewords.push({ word: res[0].queword2, lcd: fourWords[((wordIndex + 2) % 4)].lcd })
    wordQuewords.push({ word: res[0].queword3, lcd: fourWords[((wordIndex + 3) % 4)].lcd })
  })
  printHelpWords()
}

function printHelpWords () {
  printHelpWords1 = setTimeout(function () {
    if (phase === 4) {
      wordQuewords[1].lcd.println('First helpword:', 1)
      wordQuewords[1].lcd.println(wordQuewords[1].word, 2)
    }
  }, 1 * delay)
  printHelpWords2 = setTimeout(function () {
    if (phase === 4) {
      wordQuewords[2].lcd.println('Second helpword:', 1)
      wordQuewords[2].lcd.println(wordQuewords[2].word, 2)
    }
  }, 2 * delay)
  printHelpWords3 = setTimeout(function () {
    if (phase === 4) {
      wordQuewords[3].lcd.println('Third helpword:', 1)
      wordQuewords[3].lcd.println(wordQuewords[3].word, 2)
    }
  }, 3 * delay)
}

process.on('SIGINT', function () {
  clearInterval()
  LCDClass.turnAllOff()
  process.nextTick(function () { process.exit(0) })
})
