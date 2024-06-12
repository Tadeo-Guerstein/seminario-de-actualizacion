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

function handleSubmit(event) {
  event.preventDefault()

  const user = username.value
  const pass = password.value

  if (!pass.match(/^(?=.*\d).{4,8}$/)) {
    password.className += ' border-danger'
    errorLabelPass.innerText = 'Password must be between 4 and 8 digits long and include at least one numeric digit.'
    return
  }

  console.log('pass', pass)
  console.log('user', user)
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
