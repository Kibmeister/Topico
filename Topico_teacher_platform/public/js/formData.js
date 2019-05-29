window.addEventListener('load', function () {
  var form = document.getElementById('id_myForm')

  // ...and take over its submit event.
  form.addEventListener('submit', function (event) {
    console.log('dette er en test')
    // event.preventDefault()
    sendData()
  })
  console.log('kuk')
  function sendData () {
    var XHR = new XMLHttpRequest()
    console.log(XHR.readyState)

    // Bind the FormData object and the form element
    var FD = new FormData(form)
    console.log(FD)

    XHR.open('get', '/views/wordpool', true)
    XHR.send(FD)
  }
})
