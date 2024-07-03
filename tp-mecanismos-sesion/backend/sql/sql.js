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
  },
  register: async (username, password) => {
    try {
      const [response] = await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
        username,
        password
      ])
      const { insertId } = { ...response }
      await connection.execute('INSERT INTO session (id_user, logged) VALUES (?, ?)', [insertId, 1])
      return insertId
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  userExists: async (username) => {
    try {
      const [userExists] = await connection.execute('SELECT * FROM users WHERE username = ?;', [username])
      return userExists.length > 0
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  login: async (username, password) => {
    try {
      const [user] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?;', [
        username,
        password
      ])
      if (user.length > 0) {
        await connection.execute('UPDATE session SET logged = ? WHERE id_user = ?', [1, user[0].id])
        return user[0]
      }
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  logout: async (username) => {
    try {
      const [user] = await connection.execute('SELECT * FROM users WHERE username = ?;', [username])
      if (user.length > 0) {
        await connection.execute('UPDATE session SET logged = ? WHERE id_user = ?', [0, user[0].id])
        return true
      }
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  },
  admin: async (idUser) => {
    try {
      const [user] = await connection.execute('SELECT * FROM group_user WHERE id_user = ? AND id_group = 1;', [idUser])
      return user.length > 0
    } catch (error) {
      console.info('error', error)
      return [{ data: 'error', message: error }]
    }
  }
}
