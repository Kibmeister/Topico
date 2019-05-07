'use strict'

// var fs = require('fs')
var Client = require('ftp')

var c = new Client()
c.on('ready', function () {
  c.put('foo.txt', 'foo.remote-copy.txt', function (err) {
    if (err) throw err
    c.end()
  })
})
