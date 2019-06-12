const reducer = (state = null, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            const id = action.data.id
            const anecdoteObject = state.find(
                a => a.id === id
            )
            return anecdoteObject.content
        default:
            return state
    }
}

export const setNotification = id => {
    return {
        type: 'ADD_NOTIFICATION',
        data: { id }
    }
}

export default reducer