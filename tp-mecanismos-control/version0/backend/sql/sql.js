const mysql = require('mysql2/promise')
const database = require('../connection/connection.json')

let connection
let conectionStablished = false

module.exports = {
  initConnection: async () => {
    if (!conectionStablished) {
      connection = await mysql.createConnection(database)
      conectionStablished = true
    }
  },
  closeConnection: async () => {
    if (conectionStablished) {
      await connection.end()
      conectionStablished = false
    }
  },
  getUsers: async () => {
    try {
      const [data] = await connection.execute('SELECT * from user ORDER BY user.id ASC')
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getUsersGroup: async () => {
    try {
      const [data] = await connection.execute(
        `
          SELECT user.id, user.name, group_type.name AS groupName from user
          INNER JOIN group_user ON group_user.id_user = user.id
          INNER JOIN group_type ON group_type.id = group_user.id_group
        `
      )
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getActionsGroup: async () => {
    try {
      const [data] = await connection.execute(
        `
          SELECT action.id, action.name, group_type.name AS groupName from action
          INNER JOIN group_action ON group_action.id_action = action.id
          INNER JOIN group_type ON group_type.id = group_action.id_group
        `
      )
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getGroupUsers: async () => {
    try {
      const [data] = await connection.execute(
        `
          SELECT group_type.id, group_type.name, user.name AS username from group_type
          INNER JOIN group_user ON group_user.id_group = group_type.id
          INNER JOIN user ON user.id = group_user.id_user
        `
      )
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getUsersGroupActions: async () => {
    try {
      const [data] = await connection.execute(
        `
          SELECT user.id, user.name, group_type.name AS groupName, action.name AS actionName from user
          INNER JOIN group_user ON group_user.id_user = user.id 
          INNER JOIN group_type ON group_type.id = group_user.id_group
          INNER JOIN group_action ON group_action.id_group = group_type.id
          INNER JOIN action ON group_action.id_action = action.id
        `
      )
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getGroups: async () => {
    try {
      const [data] = await connection.execute('SELECT * from group_type')
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getGroupsActions: async () => {
    try {
      const [data] = await connection.execute(
        `
          SELECT group_type.id, group_type.name, action.name AS actionName from group_type 
          INNER JOIN group_action ON group_action.id_group = group_type.id 
          INNER JOIN action ON group_action.id_action = action.id
        `
      )
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getActions: async () => {
    try {
      const [data] = await connection.execute('SELECT * from action ORDER BY action.id ASC')
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setUser: async (nombre) => {
    try {
      return await connection.execute('INSERT INTO user (name) VALUES (?)', [nombre])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setUserGroups: async (idUser, idGroup) => {
    try {
      await connection.execute('INSERT INTO group_user (id_user, id_group) VALUES (?, ?)', [idUser, idGroup])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setActionGroups: async (idAction, idGroup) => {
    try {
      await connection.execute('INSERT INTO group_action (id_action, id_group) VALUES (?, ?)', [idAction, idGroup])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setGroups: async (nombre) => {
    try {
      await connection.execute('INSERT INTO group_type (name) VALUES (?)', [nombre])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setGroupsActions: async (idAccion, idGroup) => {
    try {
      await connection.execute('INSERT INTO group_action (id_action, id_group) VALUES (?, ?)', [idAccion, idGroup])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setActions: async (nombre) => {
    try {
      return await connection.execute('INSERT INTO action (name) VALUES (?)', [nombre])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  }
}
