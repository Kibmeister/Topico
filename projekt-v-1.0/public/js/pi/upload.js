'use strict'

// Initialize requires:
const fs = require('fs')
const FormData = require('form-data')
var ipAdress = require('ip').address()
var port = '8080'

// https://www.npmjs.com/package/form-data

class UploadFile {
  static UploadFile (filepath) {
    console.log('Attempting upload to: ', ipAdress, ':', port)
    fs.readFile(filepath, function (err, data) {
      if (err) throw err
      console.log('readFile data:  ', data)

      var form = new FormData()
      form.append('file', data, {
        filename: 'voice2.wav',
        contentType: 'audio/wav',
        knownLength: data.length
      })
      console.log(form)
      form.submit('http://' + ipAdress + ':' + port + '/uploadAudio', function (err, res) {
        if (err) throw err
        // res – response object (http.IncomingMessage)  //
        res.resume()
      })
    })

    /*
    // Build the post string from an object
    // console.log('Loading file from: ', filePath)
    var postData = fs.readFileSync(filePath)
    console.log('PostData: ', postData)
    // An object of options to indicate where to post to
    var postOptions = {
      method: 'POST',
      host: ipAdress,
      port: port,
      path: '/upload',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log('postOptions completed!')

    // Set up the request
    var postReq = http.request(postOptions, function (res) {
      console.log('Setting up request')
      res.setEncoding('utf8')
      /*
      res.on('data', function (chunk) {
      }) */
    // })
    // console.log('PostReq:', postReq)
    /*
    postReq.write(JSON.stringify({ cmd: "fetchAudio" audioFile: postData.toString() }))
    postReq.end()
    console.log('File sent!')**/
  }
}

// UploadFile.UploadFile()

module.exports.UploadFile = UploadFile
