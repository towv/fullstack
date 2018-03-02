const notificationReducer = (store = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION_VOTE':
    return `you voted '${action.message}'`
  case 'NOTIFICATION_ADDED':
      return `you added '${action.message}'`
  case 'RESET':
      return `${action.message}`
  default:
    return store
  }
}

export const notificationVote = (message) => {
    return {
        type: 'NOTIFICATION_VOTE',
        message: message
    }
}
export const notificationAdded = (message) => {
    console.log(message)
    return {
        type: 'NOTIFICATION_ADDED',
        message: message
    }
}
export const notificationReset= () => {
    return {
      type: 'RESET',
      message: ''
    }
}

export default notificationReducer