'use strict'
// var Gpio = require('onoff').Gpio
var myWords = ['Wave', 'Kangaroo', 'this', 'Mad Men', 'Breaking Bad', 'Modern Family', 'Game of Thrones', 'Dexter']
var word1
var word2
var word3
var word4
/* var pushButton1 = new Gpio(17, 'in', 'both') */

words()

function words () {
  var words = [word1, word2, word3, word4]
  var roundsWords = myWords
  words.forEach(function (entry) {
    var nextWord = myWords[Math.floor(Math.random() * myWords.length)]
    entry = nextWord
    var wordNumber = myWords.indexOf(entry)
    roundsWords.splice(wordNumber, 1)
  })
}

/* function choose () {
  pushButton1.watch(function (err, value) {
    if (err) throw err
    if (value === 1) {
      console.log('button 1 is pushed')
    }
  })
  pushButton2.watch(function (err, value) {
    if (err) throw err
    if (value === 1) {
      console.log('button 2 is pushed')
    }
  })
  pushButton3.watch(function (err, value) {
    if (err) throw err
    if (value === 1) {
      console.log('button 3 is pushed')
    }
  })
  pushButton4.watch(function (err, value) {
    if (err) throw err
    if (value === 1) {
      console.log('button 4 is pushed')
    }
  })
} */
