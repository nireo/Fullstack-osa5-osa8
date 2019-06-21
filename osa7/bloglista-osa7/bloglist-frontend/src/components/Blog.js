import React, { useState } from 'react'
import { Button, ButtonGroup } from "react-bootstrap"

const Blog = ({ blog, handleLike, handleRemove, showState }) => {
	const [showMore, setShowMore] = useState(showState)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
		borderRadius: '10px'
	}

	if (showMore) {
		return (
			<div style={blogStyle}>
				<div>title: {blog.title}</div>
				<div>author: {blog.author}</div>
				<div>url: {blog.url}</div>
				<div>likes: {blog.likes}</div>
				<ButtonGroup aria-label="Basic example">
					<Button onClick={() => setShowMore(false)} variant="secondary">show less</Button>
					<Button onClick={() => handleLike(blog.id)} variant="secondary">like</Button>
					<Button onClick={() => handleRemove(blog.id)} variant="danger">delete</Button>
				</ButtonGroup>
			</div>
		)
	}  

	return (
		<div style={blogStyle} >
			{blog.title}<Button variant="secondary" onClick={() => setShowMore(true)}>show more</Button>
		</div>
	)
}

export default Blog