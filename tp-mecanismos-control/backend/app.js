const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const database = require('./connection/connection.json')
const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(database)
    const [users] = await connection.execute('SELECT * from user')
    connection.end()
    res.status(200).send({ data: users })
  } catch (error) {
    console.info(error)
  }
})

app.get('/groups', async (req, res) => {
  try {
    const connection = await mysql.createConnection(database)
    const [groups] = await connection.execute('SELECT * from group_type')
    connection.end()
    res.status(200).send({ data: groups })
  } catch (error) {
    console.info(error)
  }
})

app.get('/actions', async (req, res) => {
  try {
    const connection = await mysql.createConnection(database)
    const [actions] = await connection.execute('SELECT * from action')
    connection.end()
    res.status(200).send({ data: actions })
  } catch (error) {
    console.info(error)
  }
})

app.post('/actions', async (req, res) => {
  try {
    const { body } = req
    const { nombre } = body

    if (!nombre) {
      return res.status(400).send({ message: 'nombre no puede estar vacío' })
    }

    const connection = await mysql.createConnection(database)
    await connection.execute('INSERT INTO action (name) VALUES (?)', [nombre])
    connection.end()
    res.status(200).send({ data: 'ok' })
  } catch (error) {
    console.info(error)
  }
})

app.listen(PORT, () => {
  console.info(`Your app is listening in http://localhost:${PORT}`)
})
