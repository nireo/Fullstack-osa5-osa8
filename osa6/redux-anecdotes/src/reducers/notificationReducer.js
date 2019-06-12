const reducer = (state = null, action) => {
    switch (action.type) {
        case 'VOTE_NOTIFICATION':
            if (action.data.content === null) {
                return null
            }
            return `you voted '${action.data.content}'`
        default:
            return state
    }
}

export const setNotification = content => {
    return {
        type: 'VOTE_NOTIFICATION',
        data: { content }
    }
}

export default reducer