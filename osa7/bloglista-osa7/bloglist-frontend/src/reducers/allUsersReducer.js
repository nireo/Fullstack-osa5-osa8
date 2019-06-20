import blogService from '../services/blogs'

const reducer = (state=[], action) => {
    if (action.type === 'INIT_USERS') {
        return action.data
    } 
    
    return state
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await blogService.getAll('/api/users')
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}


export default reducer