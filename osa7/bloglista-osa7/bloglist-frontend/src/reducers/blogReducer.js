import blogService from "../services/blogs"

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_LIKE':
            return state.map(b => b.id === action.data.id ? action.data : b)
        default:
            return state
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const addLike = blog => {
    const likeTemplate = {...blog, likes: blog.likes + 1}
    return async dispatch => {
        const likeBlog = await blogService.update(likeTemplate)
        dispatch({
            type: 'ADD_LIKE',
            data: likeBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll('/api/blogs')
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default reducer