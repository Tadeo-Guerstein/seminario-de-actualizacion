const URL = 'http://localhost:8080'
const tableContainer = document.querySelector('.table-responsive')
const emptyText = document.getElementById('empty-text')

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
  const users = await getUsers()
  const grupos = await getGrupos()
  if (grupos.length > 0) {
    console.log('grupos', grupos)
  }
  if (users.length > 0) {
    console.log('users', users)
    return
  }
  const span = document.createElement('span')
  span.id = 'empty-text'
  span.innerText = 'No hay datos para listar'
  tableContainer.appendChild(span)
}

document.onload = handleOnLoad()
