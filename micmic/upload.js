'use strict'

var http = require('http')
var fs = require('fs')

var filePath = './voice.wav'

function PostCode (codestring) {
  // Build the post string from an object
  var postData = fs.readFile(filePath)
  console.log(postData)
  // An object of options to indicate where to post to
  var postOptions = {
    host: '192.168.43.31',
    port: '8080',
    path: '/upload/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }
  console.log('PostOptions:', postOptions)

  // Set up the request
  var postReq = http.request(postOptions, function (res) {
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk)
    })
  })
  console.log('PostReq:', postReq)

  // post the data
  postReq.write(postData)
  postReq.end()
}

PostCode()
