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
    const [data] = await connection.execute('SELECT * from user ORDER BY user.id ASC')
    return data
  },
  getUsersGroup: async () => {
    const [data] = await connection.execute(
      `
          SELECT user.id, user.name, group_type.name AS groupName from user
          INNER JOIN group_user ON group_user.id_user = user.id
          INNER JOIN group_type ON group_type.id = group_user.id_group
        `
    )
    return data
  },
  getUsersGroupActions: async () => {
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
  },
  getGroups: async () => {
    const [data] = await connection.execute('SELECT * from group_type')
    return data
  },
  getGroupsActions: async () => {
    const [data] = await connection.execute(
      `
          SELECT group_type.id, group_type.name, action.name AS actionName from group_type 
          INNER JOIN group_action ON group_action.id_group = group_type.id 
          INNER JOIN action ON group_action.id_action = action.id
        `
    )
    return data
  },
  getActions: async () => {
    const [data] = await connection.execute('SELECT * from action')
    return data
  },
  setUser: async (nombre) => {
    return await connection.execute('INSERT INTO user (name) VALUES (?)', [nombre])
  },
  setUserGroups: async (idUser, idGroup) => {
    await connection.execute('INSERT INTO group_user (id_user, id_group) VALUES (?, ?)', [idUser, idGroup])
  },
  setGroups: async (nombre) => {
    return await connection.execute('INSERT INTO group_type (name) VALUES (?)', [nombre])
  },
  setGroupsActions: async (idAccion, idGroup) => {
    await connection.execute('INSERT INTO group_action (id_action, id_group) VALUES (?, ?)', [idAccion, idGroup])
  },
  setActions: async (nombre) => {
    await connection.execute('INSERT INTO action (name) VALUES (?)', [nombre])
  }
}
