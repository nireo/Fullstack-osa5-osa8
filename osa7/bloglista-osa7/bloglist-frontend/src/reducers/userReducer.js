import loginService from "../services/login"
import blogService from "../services/blogs"

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

export const alreadyLoggedIn = user => {
    return {
        type: 'LOG_IN',
        data: { user }
    }
}

export const logIn = credentials => {
    return async dispatch => {
        // send request to back-end and store the response in a variable
        const loggedIn = await loginService.login(credentials)
        // set the localStorage
        window.localStorage.setItem(
            'loggedBlogUser', JSON.stringify(loggedIn)
        )
        // set token for authentication needed tasks like deletion and updating
        blogService.setToken(loggedIn.token)
        // dispath the response from call and set user to the response
        dispatch({
            type: 'LOG_IN',
            data: { loggedIn }
        })
    }
}

export const logOut = () => {
    // make a call to set user to null
    localStorage.clear()
    return { type: 'LOG_OUT' }
}

export default reducer