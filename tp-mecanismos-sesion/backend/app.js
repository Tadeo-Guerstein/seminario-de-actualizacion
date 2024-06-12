const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8080
const {
  RouteAction,
  RouteActions,
  RouteGroup,
  RouteGroups,
  RouteUser,
  RouteUsers,
  RouteRegister,
  RouteLogin
} = require('./routes')

app.use(cors())
app.use(express.json())

app.get('/users', RouteUsers)
app.get('/groups', RouteGroups)
app.get('/actions', RouteActions)
app.post('/actions', RouteAction)
app.post('/groups', RouteGroup)
app.post('/users', RouteUser)
app.post('/register', RouteRegister)
app.post('/login', RouteLogin)

app.listen(PORT, () => {
  console.info(`Your app is listening in http://localhost:${PORT}`)
})
