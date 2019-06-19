const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            // if there is no content set notification to null
            if (action.data.content === null) {
                return null
            }
            // otherwise return the notification
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
            type: 'SET_NOTIFICATION',
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