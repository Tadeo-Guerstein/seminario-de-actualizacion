const URL = 'http://localhost:8080'
const tableContainer = document.querySelector('.table-responsive')
const select = document.querySelector('select')
const emptyText = document.getElementById('empty-text')
const form = document.querySelector('form')
const inputGroup = document.getElementById('grupo')
const tbody = document.querySelector('tbody')

async function getAcciones() {
  const response = await fetch(`${URL}/actions`)
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
  const { data: acciones } = await getAcciones()
  const { data: grupos } = await getGrupos()
  if (acciones.length > 0) {
    acciones.forEach((i) => {
      const option = document.createElement('option')
      option.value = i.id
      option.text = i.name.toUpperCase()
      select.add(option)
    })
  }
  if (grupos.length > 0) {
    grupos.forEach((i) => {
      const tBodyRow = tbody.insertRow()
      const tBodyCellId = tBodyRow.insertCell()
      const tBodyCellName = tBodyRow.insertCell()
      const tBodyCellActionName = tBodyRow.insertCell()

      tBodyCellId.innerText = i.id
      tBodyCellName.innerText = i.name
      tBodyCellActionName.innerText = i.actionName || 'Sin acción'
    })
    return
  }
  const span = document.createElement('span')
  span.id = 'empty-text'
  span.innerText = 'No hay datos para listar'
  tableContainer.appendChild(span)
}

async function handleOnSubmit() {
  const name = inputGroup.value
  const optionSelected = select.value
  await fetch(`${URL}/groups`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: name, idAccion: parseInt(optionSelected) })
  })
}

document.onload = handleOnLoad()
form.onsubmit = handleOnSubmit
