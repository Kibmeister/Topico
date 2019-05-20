'use strict'
// var Gpio = require('onoff').Gpio
var myWords = ['Wave', 'Kangaroo', 'this', 'Mad Men', 'Breaking Bad', 'Modern Family', 'Game of Thrones', 'Dexter']
var word1 = 'word1'
var word2 = 'word2'
var word3 = 'word3'
var word4 = 'word4'
/* var pushButton1 = new Gpio(17, 'in', 'both') */

words2()

// function words () {
//   var words = [word1, word2, word3, word4]
//   var roundsWords = myWords
//   words.forEach(function (entry) {
//     console.log(entry)
//     var nextWord = myWords[Math.floor(Math.random() * myWords.length)]
//     entry = nextWord
//     var wordNumber = myWords.indexOf(entry)
//     roundsWords.splice(wordNumber, 1)
//     console.log(entry)
//   })
//   console.log(word1)
// }
function words2 () {
  var roundsWords = myWords
  word1 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word1), 1)
  console.log(word1)
  word2 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word2), 1)
  console.log(word2)
  word3 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word3), 1)
  console.log(word3)
  word4 = myWords[Math.floor(Math.random() * myWords.length)]
  roundsWords.splice(myWords.indexOf(word4), 1)
  console.log(word4)
} console.log(word1, word2, word3, word4)

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
