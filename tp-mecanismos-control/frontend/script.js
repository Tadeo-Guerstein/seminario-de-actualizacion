const URL = 'http://localhost:8080'
const tableContainer = document.querySelector('.table-responsive')
const emptyText = document.getElementById('empty-text')
const select = document.querySelector('select')
const form = document.querySelector('form')
const tbody = document.querySelector('tbody')
const inputUser = document.getElementById('username')

async function getUsers() {
  const response = await fetch(`${URL}/users`)
  if (response.status === 200) {
    return await response.json()
  }
}

async function getGrupos() {
  const response = await fetch(`${URL}/groups`)
  if (response.status === 200) {
    return await response.json()
  }
}

async function handleOnLoad() {
  const { data: users } = await getUsers()
  const { data: grupos } = await getGrupos()
  if (grupos.length > 0) {
    grupos.forEach((i) => {
      const option = document.createElement('option')
      option.value = i.id
      option.text = i.name.toUpperCase()
      select.add(option)
    })
  }
  if (users.length > 0) {
    users.forEach((i) => {
      const tBodyRow = tbody.insertRow()
      const tBodyCellId = tBodyRow.insertCell()
      const tBodyCellName = tBodyRow.insertCell()
      const tBodyCellGroup = tBodyRow.insertCell()
      const tBodyCellActionName = tBodyRow.insertCell()

      tBodyCellId.innerText = i.id
      tBodyCellName.innerText = i.name
      tBodyCellGroup.innerText = i.groupName || 'Sin grupo'
      tBodyCellActionName.innerText = i.actionName || 'Sin acción'
    })
    return
  }
  const span = document.createElement('span')
  span.id = 'empty-text'
  span.innerText = 'No hay datos para listar'
  tableContainer.appendChild(span)
}

function handleOnSubmit(event) {
  // event.preventDefault()
  const name = inputUser.value
  const optionSelected = select.value
  // console.log('name', name)
  // console.log('optionSelected', optionSelected)
  fetch(`${URL}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: name, idGrupo: parseInt(optionSelected) })
  })
}

document.onload = handleOnLoad()
form.onsubmit = handleOnSubmit
