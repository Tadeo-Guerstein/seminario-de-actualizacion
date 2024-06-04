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
      const [response] = await connection.execute('CALL GetUsers();')
      const [data] = response
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getUsersGroup: async () => {
    try {
      const [response] = await connection.execute('CALL GetUsersGroup();')
      const [data] = response
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getActionsGroup: async () => {
    try {
      const [response] = await connection.execute('CALL GetActionsGroup()')
      const [data] = response
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getGroupUsers: async () => {
    try {
      const [response] = await connection.execute('CALL GetGroupUsers()')
      const [data] = response
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
      const [response] = await connection.execute('CALL GetGroups()')
      const [data] = response
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getGroupsActions: async () => {
    try {
      const [data] = await connection.execute('CALL GetGroupsActions()')
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  getActions: async () => {
    try {
      const [response] = await connection.execute('CALL GetActions()')
      const [data] = response
      return data
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setUser: async (nombre) => {
    try {
      await connection.execute('CALL SetUser(?, @lastId)', [nombre])
      return await connection.execute('SELECT @lastId as lastId')
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setUserGroups: async (idUser, idGroup) => {
    try {
      await connection.execute('CALL SetUserGroups(?, ?)', [idUser, idGroup])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setActionGroups: async (idAction, idGroup) => {
    try {
      await connection.execute('CALL SetActionGroups(?, ?)', [idAction, idGroup])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setGroups: async (nombre) => {
    try {
      await connection.execute('CALL SetGroups(?)', [nombre])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setGroupsActions: async (idAccion, idGroup) => {
    try {
      await connection.execute('CALL SetGroupsActions(?, ?)', [idAccion, idGroup])
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  setActions: async (nombre) => {
    try {
      await connection.execute('CALL SetActions(?, @lastId)', [nombre])
      return await connection.execute('SELECT @lastId as lastId')
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  }
}
