import React from 'react'

const BlogForm = ({
	onSubmit, 
	title,
	author,
	url
}) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<h2>create new:</h2>
				<div>title:<input 
					{...title}
				/>	
				</div>
				<div>author:<input
					{...author}
				/>
				</div>
				<div>url:<input 
					{...url}
				/>	
				</div>
				<button type="submit">add</button>
			</form>
		</div>
	)
}

export default BlogForm