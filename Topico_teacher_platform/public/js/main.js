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
    let inputMainword = document.getElementById('id_mainWord').value
    let inputHelpword1 = document.getElementById('id_helpWord1')
    let inputHelpword2 = document.getElementById('id_helpWord2')
    let inputHelpword3 = document.getElementById('id_helpWord3')
    console.log(inputMainword.length)
    if ((inputMainword.value === '') || (inputMainword.length > '16')) {
      buttonForm.preventDefault()
      inputMainword.innerHTML = 'Please add a valid main word!'
    } else {
      inputMainword.innerHTML = ''
    }
    if ((inputHelpword1.value === '') || (inputHelpword1.lenght > '16')) {
      buttonForm.preventDefault()
      inputHelpword1.textContent = 'Please add a valid helpword'
    } else {
      inputHelpword1.textContent = ''
    }
    if ((inputHelpword2.value === '') || (inputHelpword2.lenght > '16')) {
      buttonForm.preventDefault()
      inputHelpword2.textContent = 'Please add a valid helpword'
    } else {
      inputHelpword2.textContent = ''
    }
    if ((inputHelpword1.value === '') || (inputHelpword1.lenght > '16')) {
      buttonForm.preventDefault()
      inputHelpword3.textContent = 'Please add a valid helpword'
    } else {
      inputHelpword3.textContent = ''
    }
    // dataForm(inputMainword, inputHelpword1, inputHelpword2, inputHelpword3)
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
      window.alert('Your wordpool was successfully uploadet to the cloud') // 'This is the returned text.'
    } else {
      console.log('Error: ' + xhr.status) // An error occurred during the request.
      window.alert('Ops, something went wrong')
    }
  }
}

function dataForm (inputMainword, inputHelpword1, inputHelpword2, inputHelpword3) {
  // var input, text

  console.log(inputMainword.value)
  console.log(inputHelpword1.value)
  console.log(inputHelpword2.value)
  console.log(inputHelpword3.value)

  xhr.open('POST', '/index', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({
    main: inputMainword.value,
    help1: inputHelpword1.value,
    help2: inputHelpword2.value,
    help3: inputHelpword3.value
  }))
}
