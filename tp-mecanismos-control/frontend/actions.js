const URL = 'http://localhost:8080'
const tableContainer = document.querySelector('.table-responsive')
const form = document.querySelector('form')
const tbody = document.querySelector('tbody')
const inputAction = document.getElementById('accion')

async function getAcciones() {
  const response = await fetch(`${URL}/actions`)
  if (response.status === 200) {
    return await response.json()
  }
}

async function setAccion(name) {
  await fetch(`${URL}/actions`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: name })
  })
}

async function handleOnLoad() {
  const { data: acciones } = await getAcciones()
  if (acciones.length > 0) {
    acciones.forEach((i) => {
      const tBodyRow = tbody.insertRow()
      const tBodyCellId = tBodyRow.insertCell()
      const tBodyCellName = tBodyRow.insertCell()
      tBodyCellId.innerText = i.id
      tBodyCellName.innerText = i.name.toUpperCase()
    })
    return
  }
  const span = document.createElement('span')
  span.innerText = 'No hay datos para listar'
  tableContainer.appendChild(span)
}

async function handleOnSubmit() {
  const name = inputAction.value
  if (name) {
    await setAccion(name)
    inputAction.value = ''
  }
}

document.onload = handleOnLoad()
form.onsubmit = handleOnSubmit
