const formatUsers = (users, usersGroups) => {
  const newUsers = [...users]
  newUsers.forEach((usersGrouped) => {
    const foundUsersGroup = usersGroups.find((user) => {
      return usersGrouped.id === user.id
    })
    usersGrouped.groups = foundUsersGroup?.groups
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

const addGroupsTogether = (groups) => {
  const newGroups = [...groups]

  groups.forEach((i) => {
    const findSameItem = newGroups.find((auxItem) => {
      return auxItem.id === i.id
    })
    if (findSameItem) {
      if (findSameItem.groups && findSameItem.groups.length > 0) {
        findSameItem.groups.push(i.groupName)
        return
      }
      findSameItem.groups = [i.groupName]
      return
    }
  })

  return newGroups
}

module.exports = { formatUsers, formatGroups, addGroupsTogether }
