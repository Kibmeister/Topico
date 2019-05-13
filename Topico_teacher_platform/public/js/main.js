'use strict'

// const interval = setInterval(() => { fang() }, 2000)

// retreving id form buttons and handlebar divs

const buttonGroups = document.querySelector('#bt_groups')
const buttonWordpool = document.querySelector('#bt_wordpool')

var divGroups = document.getElementById('id_groups')
var divWordPool = document.getElementById('id_wordpool')

// adding event listeners to buttons, toggling the divs
buttonGroups.addEventListener('click', () => {
  divWordPool.style.display = 'none'
  divGroups.style.display = 'block'
  console.log('groups')
})
buttonWordpool.addEventListener('click', () => {
  divGroups.style.display = 'none'
  divWordPool.style.display = 'block'
  console.log('pool')
})

function fang () {
  fetch('/measurment?latest=10', {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    response.json().then((data) => {
      mostRecentValues.innerHTML = Handlebars.templates.measurment({ measurments: data })
    })
  })
}
// const intervalAlle = setInterval(() => { fangAlle() }, 60000)

function fangAlle () {
  fetch('/measurment', {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    response.json().then((dataA) => {
      makeMyChart(dataA)
    })
  })
}
