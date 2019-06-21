import React from 'react'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Blog = ({ blog, redirectLink}) => {
	return (
		<div>
			<Card>
				<Card.Header>Blog</Card.Header>
				<Card.Body>
					<Card.Title>{blog.title}</Card.Title>
					<Card.Text>
					by {blog.author}
					</Card.Text>
					<Link to={`/blogs/${blog.id}`} variant="primary">show more</Link>
				</Card.Body>
			</Card>
			<br />
		</div>

	)

}

export default Blog