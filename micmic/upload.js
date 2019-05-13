'use strict'

var http = require('http')
var fs = require('fs')
var path = require('path')

var filePath = path.join(__dirname, 'voice2.wav')

function UploadFile (codestring) {
  // Build the post string from an object
  var postData = JSON.stringify(fs.createReadStream(filePath))
  console.log(postData)
  // An object of options to indicate where to post to
  var postOptions = {
    host: '192.168.43.31',
    port: '8080',
    path: '/upload/',
    method: 'POST'
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

  postReq.write(postData)
  postReq.end()
}

UploadFile()
