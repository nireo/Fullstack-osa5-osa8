import blogService from "../services/blogs"

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_LIKE':
            const id = action.data.id
            const toBeLiked = state.find(
                b => b.id === id
            )
            const liked = {
                ...toBeLiked, votes: toBeLiked.votes + 1
            }
            return state.map(b => b.id !== action.data.id ? b : action.data)
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
    return async dispatch => {
        const likeBlog = await blogService.update(blog.id, {...blog, likes: blog.likes + 1})
        dispatch({
            type: 'ADD_LIKE',
            data: likeBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default reducer