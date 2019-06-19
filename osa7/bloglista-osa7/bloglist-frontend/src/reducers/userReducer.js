const reducer = (state=null, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return action.data
        case 'LOG_OUT':
            return null
        default:
            return state
    }
}

export const logIn = info => {
    return {
        type: 'LOG_IN',
        data: info
    }
}

export const logOut = () => {
    return { type: 'LOG_OUT' }
}

export default reducer