const URL = 'http://localhost:8080'
const tableContainer = document.querySelector('.table-responsive')
const emptyText = document.getElementById('empty-text')

async function getAcciones() {
  const response = await fetch(`${URL}/actions`)
  if (response.status === 200) {
    return await response.json()
  }
}

async function handleOnLoad() {
  const acciones = await getAcciones()
  if (acciones.length > 0) {
    console.log('acciones', acciones)
    return
  }
  const span = document.createElement('span')
  span.id = 'empty-text'
  span.innerText = 'No hay datos para listar'
  tableContainer.appendChild(span)
}

document.onload = handleOnLoad()
