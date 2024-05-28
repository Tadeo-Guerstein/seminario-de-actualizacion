const SQL = require('../sql')
const { formatGroups } = require('../utils')

const RouteGroups = async (req, res) => {
  try {
    await SQL.initConnection().then()
    const groups = await SQL.getGroups()
    const groupsActions = await SQL.getGroupsActions()

    const newGroups = formatGroups(groups, groupsActions)

    await SQL.closeConnection()
    res.status(200).send({ data: newGroups })
  } catch (error) {
    console.info(error)
  }
}

module.exports = RouteGroups
