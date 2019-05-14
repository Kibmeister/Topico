'use strict'

var http = require('http')
var fs = require('fs')
var path = require('path')

var filePath = path.join(__dirname, 'voice2.wav')

function UploadFile () {
  // Build the post string from an object
  console.log('Loading file from: ', filePath)
  var postData = fs.createReadStream(filePath)
  console.log('PostData: ', postData)
  // An object of options to indicate where to post to
  var postOptions = {
    method: 'POST',
    host: '192.168.1.62',
    port: '8080',
    path: '/upload/',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  console.log('postOptions completed!')
  // console.log('PostOptions:', postOptions)

  // Set up the request
  var postReq = http.request(postOptions, function (res) {
    console.log('Setting up request')
    res.setEncoding('7bit')
    console.log('Encoding set!')
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk)
    })
  })
  // console.log('PostReq:', postReq)

  postReq.write(postData)
  postReq.end()
}

UploadFile()
