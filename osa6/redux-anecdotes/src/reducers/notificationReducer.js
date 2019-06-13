const reducer = (state = null, action) => {
    switch (action.type) {
        case 'VOTE_NOTIFICATION':
            if (action.data.content === null) {
                return null
            }
            return action.data.content
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (content, timeInSeconds) => {
    // since setTimeout() only accepts milliseconds 1 second = 1000 milliseconds
    const timeInMilli = timeInSeconds * 1000
    return async dispatch =>  {
        dispatch({
            type: 'VOTE_NOTIFICATION',
            data: { content }
        })
        await setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, timeInMilli)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default reducer