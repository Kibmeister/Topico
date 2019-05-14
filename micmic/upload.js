'use strict'

// Initialize requires:
const http = require('http')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'voice2.wav')
var ipAdress = require('ip').address()
var port = '8080'

console.log('Attempting upload to: ', ipAdress, ':', port)

function UploadFile () {
  // Build the post string from an object
  console.log('Loading file from: ', filePath)
  var postData = fs.readFileSync(filePath)
  console.log('PostData: ', postData)
  // An object of options to indicate where to post to
  var postOptions = {
    method: 'POST',
    host: ipAdress,
    port: port,
    path: '/upload/',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  console.log('postOptions completed!')

  // Set up the request
  var postReq = http.request(postOptions, function (res) {
    console.log('Setting up request')
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
    })
  })
  // console.log('PostReq:', postReq)

  postReq.write(postData)
  postReq.end()
  console.log('File sent!')
}

UploadFile()
