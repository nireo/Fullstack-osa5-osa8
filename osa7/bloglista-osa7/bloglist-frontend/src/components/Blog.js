import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, showState }) => {
	const [showMore, setShowMore] = useState(showState)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	if (showMore) {
		return (
			<div style={blogStyle}>
				<div>title: {blog.title}</div>
				<div>author: {blog.author}</div>
				<div>url: {blog.url}</div>
				<div>likes: {blog.likes}<button onClick={() => handleLike(blog.id)}>like</button>
				</div>
				<button onClick={() => setShowMore(false)}>close</button><button onClick={() => handleRemove(blog.id)}>delete</button>
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