const SQL = require('../sql')
const { formatUsers } = require('../utils')

const RouteUsers = async (req, res) => {
  try {
    await SQL.initConnection().then()
    const users = await SQL.getUsers()
    const usersGroups = await SQL.getUsersGroup()
    const usersGroupsActions = await SQL.getUsersGroupActions()

    const newUsers = formatUsers(users, usersGroups, usersGroupsActions)

    await SQL.closeConnection()
    res.status(200).send({ data: newUsers })
  } catch (error) {
    console.info(error)
  }
}

module.exports = RouteUsers
