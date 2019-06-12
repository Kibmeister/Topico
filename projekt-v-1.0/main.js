'use strict'
var Gpio = require('onoff').Gpio

const UploadFile = require('./public/js/pi/upload.js')
const UploadFileClass = UploadFile.UploadFile
const WordsClass = require('./db/words').Words
const micInstance = require('./public/js/pi/mic')

const LCD = require('./public/js/pi/lcd')
const LCDClass = LCD.LCDClass
const lcd1 = LCD.lcd1
const lcd2 = LCD.lcd2
const lcd3 = LCD.lcd3
const lcd4 = LCD.lcd4

let chosenWord = { word: 'chosenWord', lcd: 'chosenLCD' }
var wordIndex
var word1 = 'word1'
var word2 = 'word2'
var word3 = 'word3'
var word4 = 'word4'

let fourWords = [
  { word: word1, lcd: lcd1 },
  { word: word2, lcd: lcd2 },
  { word: word3, lcd: lcd3 },
  { word: word4, lcd: lcd4 }]

var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 1000 })
// var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 1000 })
var pushButton2 = new Gpio(14, 'in', 'falling', { debounceTimeout: 5000 })
// Output is sent after holding the button for 5 seconds
var phase = 0

LCDClass.clearAll()

// Prevent button repeated presses:
pushButton1.watch(function (err, value) {
  console.log('pushbutton 1 pressed')
  if (err) throw err
  if (phase !== 4) {
    phase++
    initiator()
    console.log('Button is pushed, phase: ', phase)
  }
})

function initiator () {
  if (phase === 1) {
    words()
  }
  if (phase === 2) {
    choose()
  }
  if (phase === 3) {
    queWord()
  }
  if (phase === 4) {
    pushButton1.watch(function (err, value) {
      if (err) throw err
      micInstance.start()
      console.log('Recording started')
      pushButton1.watch(function (err, value) {
        if (err) throw err
        micInstance.stop()
        console.log('micInstance stopped')
        LCDClass.clearAll()
        LCDClass.writeToAll('Click to submit', 1)
        LCDClass.writeToAll('Hold to rerecord', 2)
        console.log('Please select whether to upload or record again')
        pushButton1.watch(function (err, value) {
          if (err) throw err
          console.log('Upload selected')
          UploadFileClass.UploadFile(chosenWord.word)
          phase++
        })
        pushButton2.watch(function (err, value) {
          if (err) throw err
          console.log('Record again selected')
          LCDClass.clearAll()
          phase--
        })
      })
    })
    // micInstance.start()
    // setTimeout(() => {
    //   UploadFileClass.UploadFile(chosenWord.word)
    // }, 25000)
  }
  if (phase === 5) {
    console.log('phase 5 reached!')
  }
}

function words () {
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

function choose () {
  console.log('Choose() called')
  wordIndex = Math.floor(Math.random() * fourWords.length)
  chosenWord = fourWords[wordIndex]
  LCDClass.clearAll()
  chosenWord.lcd.println('You got:', 1)
  chosenWord.lcd.println(chosenWord.word, 2)
}

function queWord () {
  console.log('queWord() called')
  let wordQuewords = []
  WordsClass.getQueWords(chosenWord.word, function (err, res) {
    if (err) return err
    wordQuewords.push(chosenWord)
    wordQuewords.push({ word: res[0].queword1, lcd: fourWords[((wordIndex + 1) % 4)].lcd })
    wordQuewords.push({ word: res[0].queword2, lcd: fourWords[((wordIndex + 2) % 4)].lcd })
    wordQuewords.push({ word: res[0].queword3, lcd: fourWords[((wordIndex + 3) % 4)].lcd })
  })
  setTimeout(() => {
    wordQuewords[1].lcd.println('First queword:', 1)
    wordQuewords[1].lcd.println(wordQuewords[1].word, 2)
  }, 10000)
  setTimeout(() => {
    wordQuewords[2].lcd.println('Second queword:', 1)
    wordQuewords[2].lcd.println(wordQuewords[2].word, 2)
  }, 20000)
  setTimeout(() => {
    wordQuewords[3].lcd.println('Third queword:', 1)
    wordQuewords[3].lcd.println(wordQuewords[3].word, 2)
  }, 30000)
  clearTimeout()
}

process.on('SIGINT', function () {
  clearInterval()
  LCDClass.turnAllOff()
  process.nextTick(function () { process.exit(0) })
})

exports.chosenWord = chosenWord.word
