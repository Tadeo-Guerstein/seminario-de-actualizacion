const URL = 'http://localhost:8080'
const checkbox = document.getElementById('showPassword')
const password = document.getElementById('password')
const username = document.getElementById('username')
const errorLabelUser = document.getElementById('errorLabelUser')
const errorLabelPass = document.getElementById('errorLabelPass')
const form = document.querySelector('form')

function handleChangeCheckbox({ target: { checked } }) {
  if (checked) {
    password.setAttribute('type', 'text')
    return
  }
  password.setAttribute('type', 'password')
}

async function handleSubmit(event) {
  event.preventDefault()

  const user = username.value
  const pass = password.value

  if (!pass.match(/^(?=.*\d).{4,8}$/)) {
    password.className += ' border-danger'
    errorLabelPass.innerText = 'Password must be between 4 and 8 digits long and include at least one numeric digit.'
    return
  }

  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass })
  })

  const data = await response.json()

  if (response.status !== 200) {
    password.className += ' border-danger'
    username.className += ' border-danger'
    errorLabelPass.innerText = data.message
    errorLabelUser.innerText = data.message
    return
  }

  window.location.href = './users.html'
}

function handleInputFocus() {
  password.className = 'form-control'
  username.className = 'form-control'
  errorLabelPass.innerText = ''
  errorLabelUser.innerText = ''
}

checkbox.onchange = handleChangeCheckbox
form.onsubmit = handleSubmit
password.onfocus = handleInputFocus
username.onfocus = handleInputFocus
