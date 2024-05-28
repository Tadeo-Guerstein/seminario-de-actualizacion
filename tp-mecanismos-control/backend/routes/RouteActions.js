const SQL = require('../sql')

const RouteActions = async (req, res) => {
  try {
    await SQL.initConnection().then()
    const actions = await SQL.getActions()
    await SQL.closeConnection()
    res.status(200).send({ data: actions })
  } catch (error) {
    console.info(error)
  }
}

module.exports = RouteActions
