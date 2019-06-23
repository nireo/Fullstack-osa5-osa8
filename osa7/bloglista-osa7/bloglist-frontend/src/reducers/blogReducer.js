import blogService from "../services/blogs"

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            console.log(state)
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'UPDATE':
            console.log(action.data)
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
            type: 'UPDATE',
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

export const handleComment = (blog, comment) => {
    const commentObject = { comment: comment.value }
    return async dispatch => {
        if (comment === '') {
            return null
        }
        const commentedBlog = await blogService.addComment(blog, commentObject)
        dispatch({
            type: 'NEW_COMMENT',
            data: { commentedBlog }
        })
    }
}

export default reducer