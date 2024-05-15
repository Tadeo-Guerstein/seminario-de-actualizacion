const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const app = express()
const PORT = 8080
const database = require('./connection/connection.json')

app.use(cors())
app.use(express.json())

app.get('/contactos', async (req, res) => {
  try {
    const connection = await mysql.createConnection(database)
    const [contactos] = await connection.execute('SELECT * from contacto')
    const [telefonos] = await connection.execute('SELECT * from telefono')
    const newContactos = []

    contactos.forEach((contacto) => {
      const telefonosContacto = telefonos.filter((telefono) => {
        return telefono.id_contacto === contacto.id
      })
      if (telefonosContacto.length > 0) {
        newContactos.push({ ...contacto, telefonos: telefonosContacto })
      }
    })
    res.status(200).send({ data: newContactos })
    connection.end()
  } catch (error) {
    console.info('error', error)
    res.status(409).send({ data: 'error', message: error })
  }
})

app.get('/contacto/:idContacto', async (req, res) => {
  try {
    const {
      params: { idContacto }
    } = { ...req }
    const connection = await mysql.createConnection(database)
    const [contacto] = await connection.execute('SELECT nombre from contacto WHERE id = ?', [idContacto])
    const [telefonos] = await connection.execute('SELECT * from telefono WHERE id_contacto = ?', [idContacto])

    res.status(200).send({ data: { contacto: contacto[0], telefonos } })
    connection.end()
  } catch (error) {
    console.info('error', error)
    res.status(409).send({ data: 'error', message: error })
  }
})

app.post('/contacto', async (req, res) => {
  try {
    const { body } = req
    const { nombreContacto, telefonos } = body
    if (telefonos && telefonos.length === 0) {
      res.status(409).send({ error: 'Un telefono se tiene que agregar' })
      return
    }

    const connection = await mysql.createConnection(database)

    const [contacto] = await connection.execute('INSERT INTO contacto (nombre) VALUES (?)', [nombreContacto])
    const { insertId } = { ...contacto }
    telefonos.forEach(async (telefono) => {
      await connection.execute('INSERT INTO telefono (numero, id_contacto) VALUES (?, ?)', [telefono, insertId])
    })

    res.status(200).send({ data: {} })
    connection.end()
  } catch (error) {
    console.info('error', error)
    res.status(409).send({ data: 'error', message: error })
  }
})

app.put('/contacto/:idContacto', async (req, res) => {
  try {
    const { body, params } = req
    const { nombre, telefonos } = body
    const { idContacto } = params
    if (telefonos && telefonos.length === 0) {
      res.status(409).send({ error: 'Un telefono se tiene que agregar' })
      return
    }

    const connection = await mysql.createConnection(database)
    await connection.execute('UPDATE contacto SET nombre = ? WHERE id = ?', [nombre, idContacto])
    telefonos.forEach(async ({ numero, id }) => {
      await connection.execute('UPDATE telefono SET numero = ? WHERE id_contacto = ? AND id = ?', [
        numero,
        idContacto,
        id
      ])
    })

    res.status(200).send({ data: {} })
    connection.end()
  } catch (error) {
    console.info('error', error)
    res.status(409).send({ data: 'error', message: error })
  }
})

app.delete('/contacto/:idContacto', async (req, res) => {
  try {
    const {
      params: { idContacto }
    } = { ...req }

    const connection = await mysql.createConnection(database)

    await connection.execute('DELETE FROM telefono WHERE id_contacto = ?', [idContacto])
    await connection.execute('DELETE FROM contacto WHERE id = ?', [idContacto])

    res.status(200).send({ data: {} })
    connection.end()
  } catch (error) {
    console.info('error', error)
    res.status(409).send({ data: 'error', message: error })
  }
})

app.listen(PORT, () => {
  console.info(`Your app is listening in http://localhost:${PORT}`)
})
