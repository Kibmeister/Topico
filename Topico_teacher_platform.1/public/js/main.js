'use strict'

// retreving id form buttons and handlebar divs

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
  console.log('pool')
  divWordPool.innerHTML = Handlebars.templates.wordpool()
})
buttonDictionary.addEventListener('click', () => {
  divGroups.style.display = 'none'
  divWordPool.style.display = 'none'
  divDictionary.style.display = 'block'
  console.log('dictionary')
})

function group () {
  fetch('/groups', {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    response.json().then((data) => {
      // console.log(data[1].dataWords)
      console.log(data)
      divGroups.innerHTML = Handlebars.templates.groups({ words: data[0].dataWords, rpath: data[1].dataWords
      })
      // divGroups.innerHTML = Handlebars.templates.groups({ rpath: data[1].dataWords })
    })
  })
}