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
    const [users] = await connection.execute('SELECT * from user ORDER BY user.id ASC')
    const [usersGroups] = await connection.execute(
      `
        SELECT user.id, user.name, group_type.name AS groupName from user
        INNER JOIN group_user ON group_user.id_user = user.id
        INNER JOIN group_type ON group_type.id = group_user.id_group
      `
    )
    const [usersGroupsActions] = await connection.execute(
      `
        SELECT user.id, user.name, group_type.name AS groupName, action.name AS actionName from user
        INNER JOIN group_user ON group_user.id_user = user.id 
        INNER JOIN group_type ON group_type.id = group_user.id_group
        INNER JOIN group_action ON group_action.id_group = group_type.id
        INNER JOIN action ON group_action.id_action = action.id
      `
    )
    const newUsers = [...users]

    newUsers.forEach((usersGrouped) => {
      const foundUsersActions = usersGroupsActions.find((user) => {
        return usersGrouped.id === user.id
      })
      const foundUsersGroup = usersGroups.find((user) => {
        return usersGrouped.id === user.id
      })
      usersGrouped.actionName = foundUsersActions?.actionName
      usersGrouped.groupName = foundUsersGroup?.groupName
    })

    newUsers.sort((a, b) => {
      return a.id - b.id
    })

    connection.end()
    res.status(200).send({ data: newUsers })
  } catch (error) {
    console.info(error)
  }
})

app.get('/groups', async (req, res) => {
  try {
    const connection = await mysql.createConnection(database)
    const [groups] = await connection.execute('SELECT * from group_type')
    const [groupsActions] = await connection.execute(
      `
        SELECT group_type.id, group_type.name, action.name AS actionName from group_type 
        INNER JOIN group_action ON group_action.id_group = group_type.id 
        INNER JOIN action ON group_action.id_action = action.id
      `
    )

    const newGroups = [...groups]

    newGroups.forEach((groupAction) => {
      const foundGroup = groupsActions.find((group) => {
        return groupAction.id === group.id
      })
      groupAction.actionName = foundGroup?.actionName
    })

    newGroups.sort((a, b) => {
      return a.id - b.id
    })

    connection.end()
    res.status(200).send({ data: newGroups })
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

app.post('/groups', async (req, res) => {
  try {
    const { body } = req
    const { nombre, idAccion } = body

    if (!nombre) {
      return res.status(400).send({ message: 'nombre no puede estar vacío' })
    }

    const connection = await mysql.createConnection(database)
    const [grupo] = await connection.execute('INSERT INTO group_type (name) VALUES (?)', [nombre])
    if (idAccion !== 0) {
      const { insertId } = { ...grupo }
      await connection.execute('INSERT INTO group_action (id_action, id_group) VALUES (?, ?)', [idAccion, insertId])
    }
    connection.end()
    res.status(200).send({ data: 'ok' })
  } catch (error) {
    console.info(error)
  }
})

app.post('/users', async (req, res) => {
  try {
    const { body } = req
    const { nombre, idGrupo } = body

    if (!nombre) {
      return res.status(400).send({ message: 'nombre no puede estar vacío' })
    }

    const connection = await mysql.createConnection(database)
    const [user] = await connection.execute('INSERT INTO user (name) VALUES (?)', [nombre])
    if (idGrupo !== 0) {
      const { insertId } = { ...user }
      await connection.execute('INSERT INTO group_user (id_user, id_group) VALUES (?, ?)', [insertId, idGrupo])
    }
    connection.end()
    res.status(200).send({ data: 'ok' })
  } catch (error) {
    console.info(error)
  }
})

app.listen(PORT, () => {
  console.info(`Your app is listening in http://localhost:${PORT}`)
})
