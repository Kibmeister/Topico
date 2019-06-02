'use strict'
var Gpio = require('onoff').Gpio
// var mic = require('mic')
// var fs = require('fs')
var LCD = require('lcdi2c')

const WordsClass = require('./db/words').Words
const LCDClass = require('./public/js/pi/lcd').LCDClass
const MicClass = require('./public/js/pi/mic').MicClass

var lcd1 = new LCD(1, 0x27, 16, 2)
var lcd2 = new LCD(1, 0x26, 16, 2)
var lcd3 = new LCD(1, 0x25, 16, 2)
var lcd4 = new LCD(1, 0x23, 16, 2)
let lcdChain = [lcd1, lcd2, lcd3, lcd4]

// wordpool.getWords(function (err, res, fields) {
//   if (err) throw err
//   myWords = res
// })
let queWords = []
let chosenWord
var word1 = 'word1'
var word2 = 'word2'
var word3 = 'word3'
var word4 = 'word4'
let fourWords = [
  { word: word1, lcd: lcd1 },
  { word: word2, lcd: lcd2 },
  { word: word3, lcd: lcd3 },
  { word: word4, lcd: lcd4 }]
var pushButton1 = new Gpio(4, 'in', 'rising', { debounceTimeout: 20 })
// var pushButton2 = new Gpio(6, 'in', 'rising', { debounceTimeout: 20 })
var phase = 0

// lcd1.clear()
// lcd2.clear()
// lcd3.clear()
// lcd4.clear()
LCDClass.clearAll()

// var micInstance = mic({
//   device: 'plughw:0,0',
//   fileType: 'wav',
//   rate: '44100',
//   channels: '1',
//   debug: true,
//   exitOnSilence: 6
// })
// var micInputStream = micInstance.getAudioStream()

// var outputFileStream = fs.WriteStream('voice2.wav')

// Prevent button repeated presses:
pushButton1.watch(function (err, value) {
  if (err) throw err
  console.log('Button is pushed!')
  phase++
  initiator()
})

function initiator () {
  console.log('Current phase: ', phase)
  if (phase === 1) {
    words()
  }
  if (phase === 3) {
    choose()
  }
  if (phase === 5) {
    queWord()
  }
  if (phase === 7) {
    MicClass.startRecording()
  }
  if (phase === 8) {
    MicClass.stopRecording()
  }
}

function words () {
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
  phase++
}

function choose () {
  console.log('Stage 2')
  // Select a word at random for the group:
  chosenWord = fourWords[Math.floor(Math.random() * fourWords.length)]
  console.log('quewords is initiated')
  WordsClass.getQueWords(chosenWord.word, function (err, res) {
    if (err) return err
    console.log('Chosenword: ', chosenWord)
    console.log('fourwords: ', fourWords)
    fourWords.forEach(function (wordEntry) {
      if (wordEntry.word === chosenWord.word) {
        queWords = [
          chosenWord,
          console.log('Index of queword 1: ', fourWords[(fourWords.indexOf((wordEntry) + 1) % 4)]),
          { word: res[0].queword1, lcd: fourWords[(fourWords.indexOf((wordEntry) + 1) % 4)] },
          console.log('Index of queword 2: ', fourWords[(fourWords.indexOf((wordEntry) + 2) % 4)]),
          { word: res[0].queword2, lcd: fourWords[(fourWords.indexOf((wordEntry) + 2) % 4)] },
          console.log('Index of queword 3: ', fourWords[(fourWords.indexOf((wordEntry) + 3) % 4)]),
          { word: res[0].queword3, lcd: fourWords[(fourWords.indexOf((wordEntry) + 3) % 4)] }]
      }
    })
  })
  LCDClass.clearAll()
}

function queWord () {
  console.log('quewords function is initiated')
  //   WordsClass.getQueWords(chosenWord.word, function (err, res) {
  //     if (err) return err
  //     console.log('Response[0]:', res[0])
  //     console.log('fourwords: ', fourWords)
  //     fourWords.forEach(function (wordEntry) {
  //       if (wordEntry.word === chosenWord.word) {
  //         queWords = [
  //           chosenWord,
  //           { word: res[0].queword1, lcd: fourWords[(fourWords.indexOf((chosenWord) + 1) % 4)].lcd },
  //           { word: res[0].queword2, lcd: fourWords[(fourWords.indexOf((chosenWord) + 2) % 4)].lcd },
  //           { word: res[0].queword3, lcd: fourWords[(fourWords.indexOf((chosenWord) + 3) % 4)].lcd }]
  //         // word: res[0].queword1, lcd: fourWords[(fourWords.indexOf((chosenWord) + 1) % 4)].lcd }
  //       }
  //     })
  //  })
}

function queWordddd2 () {
  console.log('quewords is initiated')
  queWords = WordsClass.getQueWords(chosenWord)

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
  phase++
}

// function startRecording () {
//   pushButton2.watch(function (err, value) {
//     if (err) throw err
//     if (phase === 7) {
//       micInstance.start()
//     }
//   })
//   micInstance.stop()
// }

// micInputStream.pipe(outputFileStream)

// micInputStream.on('data', function (data) {
//   console.log('Recieved Input Stream: ' + data.length)
// })

// micInputStream.on('error', function (err) {
//   console.log('Error in Input Stream: ' + err)
// })

// micInputStream.on('startComplete', function () {
//   console.log('Got SIGNAL startComplete')
//   setTimeout(function () {
//     micInstance.stop()
//   }, 20000)
// })

// micInputStream.on('stopComplete', function () {
//   console.log('Got SIGNAL stopComplete')
//   lcd1.clear()
//   lcd1.println('Want to try again?', 1)
//   lcd2.clear()
//   lcd2.println('Want to try again?', 1)
//   lcd3.clear()
//   lcd3.println('Want to try again?', 1)
//   lcd4.clear()
//   lcd4.println('Want to try again?', 1)
// })

// /* micInputStream.on('silence', function () {
//   console.log('Got SIGNAL silence')
//   micInstance.stop()
// }) */

// micInputStream.on('processExitComplete', function () {
//   console.log('Got SIGNAL processExitComplete')
// })

process.on('SIGINT', function () {
  clearInterval()
  lcdChain.forEach(function (i) {
    i.off()
  })
  process.nextTick(function () { process.exit(0) })
})
