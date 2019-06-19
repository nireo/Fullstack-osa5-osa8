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
					  value={title.value} 
					  type={title.type}
					  onChange={title.onChange}
				/>	
				</div>
				<div>author:<input
					value={author.value}
					type={author.type}
					onChange={author.onChange}
				/>
				</div>
				<div>url:<input 
					value={url.value}
					type={url.type}
					onChange={url.onChange}
				/>	
				</div>
				<button type="submit">add</button>
			</form>
		</div>
	)
}

export default BlogForm