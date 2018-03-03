const notificationReducer = (store = '', action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.message
        default:
            return store
    }
}

export const notify = (message, seconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTIFY',
            message
        })
        await setTimeout(() => {
            dispatch({
                type: 'NOTIFY',
                message: ''
            })
        }, seconds * 1000)
    }
}

export default notificationReducer