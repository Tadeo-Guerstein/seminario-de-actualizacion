const SQL = require('../sql')

const RouteUser = async (req, res) => {
  try {
    const { body } = req
    const { nombre, idGrupo } = body

    if (!nombre) {
      return res.status(400).send({ message: 'nombre no puede estar vacío' })
    }

    await SQL.initConnection().then()
    const [user] = await SQL.setUser(nombre)
    if (idGrupo !== 0) {
      const { insertId } = { ...user }
      await SQL.setUserGroups(insertId, idGrupo)
    }
    await SQL.closeConnection()
    res.status(200).send({ data: 'ok' })
  } catch (error) {
    console.info(error)
  }
}

module.exports = RouteUser
