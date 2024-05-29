const formatUsers = (users, usersGroups, usersGroupsActions) => {
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

  return newUsers
}

const formatGroups = (groups, groupsActions) => {
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

  return newGroups
}

module.exports = { formatUsers, formatGroups }
