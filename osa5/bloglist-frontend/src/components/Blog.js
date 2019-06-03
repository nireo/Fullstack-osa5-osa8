import React, {useState} from 'react'
const Blog = ({ blog, handleLike }) => {
    const [showMore, setShowMore] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (showMore) {
        return (
            <div style={blogStyle} onClick={() => setShowMore(false)}>
                <div>title: {blog.title}</div>
                <div>author: {blog.author}</div>
                <div>url: {blog.url}</div>
                <div>likes: {blog.likes}<button onClick={handleLike}></button></div>
            </div>
        )
    }

    return (
        <div style={blogStyle} onClick={() => setShowMore(true)}>
            {blog.title} {blog.author}
        </div>
    )
}

export default Blog