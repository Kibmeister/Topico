var http = require('http')
var fs = require('fs')
var formidable = require('formidable')

// html file containing upload form
var uploadhtml = fs.readFileSync('upload_file.html')

// replace this with the location to save uploaded files
var uploadpath = '/uploads/'

http.createServer(function (req, res) {
  if (req.url === 'C:/Users/Kobe/Desktop/itpdp/Server/uploadform') {
    res.writeHead(200)
    res.write(uploadhtml)
    return res.end()
  } else if (req.url === '/fileupload') {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
      if (err) throw err
      // oldpath : temporary folder to which file is saved to
      var oldpath = files.filetoupload.path
      var newpath = uploadpath + files.filetoupload.name
      // copy the file to a new location
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err
        // you may respond with another html page
        res.write('File uploaded and moved!')
        res.end()
      })
    })
  }
}).listen(8086)
