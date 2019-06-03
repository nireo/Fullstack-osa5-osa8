import React from "react"

const BlogForm = ({
    onSubmit, 
    handleTitle,
    handleAuthor,
    handleUrl,
    title,
    author,
    url
}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
				<h2>create new:</h2>
				<div>title:<input 
						type="text"
						valuie={title}
						name="Title"
						onChange={handleTitle}
					/>	
				</div>
				<div>author:<input
						type="text"
						value={author}
						name="Author"
						onChange={handleAuthor}
					/>
				</div>
				<div>url:<input 
						type="text"
						value={url}
						name="URL"
						onChange={handleUrl}
					/>	
				</div>
				<button type="submit">add</button>
			</form>
        </div>
    )
}