'use strict'

// retreving id form buttons and handlebar divs
group()

const buttonGroups = document.querySelector('#bt_groups')
const buttonWordpool = document.querySelector('#bt_wordpool')
const buttonDictionary = document.querySelector('#bt_dictionary')

const divGroups = document.getElementById('id_groups')
const divWordPool = document.getElementById('id_wordpool')
const divDictionary = document.getElementById('id_dictionary')

// adding event listeners to buttons, toggling the divs
buttonGroups.addEventListener('click', () => {
  divWordPool.style.display = 'none'
  divDictionary.style.display = 'none'
  divGroups.style.display = 'block'
  group()
})

buttonWordpool.addEventListener('click', () => {
  divGroups.style.display = 'none'
  divDictionary.style.display = 'none'
  divWordPool.style.display = 'block'
  divWordPool.innerHTML = Handlebars.templates.wordpool()
  var buttonForm = document.querySelector('#bt_pool')
  buttonForm.addEventListener('click', function (buttonForm) {
    let inputMainword = document.getElementById('id_mainWord')
    let inputHelpword1 = document.getElementById('id_helpWord1')
    let inputHelpword2 = document.getElementById('id_helpWord2')
    let inputHelpword3 = document.getElementById('id_helpWord3')

    if ((inputMainword.value === '') || (inputMainword.value.length > '16')) {
      buttonForm.preventDefault()
      window.swal('¡Un problemo!', ' Main word too long or no value!')
    } if ((inputHelpword1.value === '') || (inputHelpword1.value.lenght > '16')) {
      buttonForm.preventDefault()
      window.swal('¡Un problemo!', ' Help word too long or no value!')
    } if ((inputHelpword2.value === '') || (inputHelpword2.value.lenght > '16')) {
      buttonForm.preventDefault()
      window.swal('¡Un problemo!', ' Help word too long or no value!')
    }
    if ((inputHelpword3.value === '') || (inputHelpword3.value.lenght > '16')) {
      buttonForm.preventDefault()
      window.swal('¡Un problemo!', ' Help word too long or no value!')
    }
    dataForm(inputMainword.value, inputHelpword1.value, inputHelpword2.value, inputHelpword3.value)
  })
})

buttonDictionary.addEventListener('click', () => {
  divGroups.style.display = 'none'
  divWordPool.style.display = 'none'
  divDictionary.style.display = 'block'
  dictionary()
})

function group () {
  fetch('/groups', {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    response.json().then((data) => {
      // console.log(data)
      divGroups.innerHTML = Handlebars.templates.groups({ words: data, rpath: data })
    })
  })
}
function dictionary () {
  fetch('/dictionary', {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    response.json().then((data) => {
      // console.log(data)
      divDictionary.innerHTML = Handlebars.templates.dictionary({ pair: data })
    })
  })
}

var xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      window.swal('¡Muy bien!', 'Your wordpool was successfully uploadet to the cloud') // 'This is the returned text.'
    } else {
      console.log('Error: ' + xhr.status) // An error occurred during the request.
      window.swal('Un error', 'Ops, something went wrong')
    }
  }
}

function dataForm (inputMainword, inputHelpword1, inputHelpword2, inputHelpword3) {
  // var input, text

  console.log(inputMainword)
  console.log(inputHelpword1)
  console.log(inputHelpword2)
  console.log(inputHelpword3)

  xhr.open('POST', '/index', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({
    main: inputMainword,
    help1: inputHelpword1,
    help2: inputHelpword2,
    help3: inputHelpword3
  }))
  console.log('Dataform sent successfully!')
}
