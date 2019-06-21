import React from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({
	onSubmit, 
	title,
	author,
	url
}) => {
	return (
		<div>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<h2>create new blog:</h2>
					<Form.Label>title:</Form.Label>
					<Form.Control 
						value={title.value} 
						type={title.type}
						onChange={title.onChange}
					/>	
					<Form.Label>author:</Form.Label>
					<Form.Control
						value={author.value}
						type={author.type}
						onChange={author.onChange}
					/>
					<Form.Label>url:</Form.Label>
					<Form.Control 
						value={url.value}
						type={url.type}
						onChange={url.onChange}
					/>	
					<Button variant="primary" type="submit">add</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default BlogForm