import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')


	// get blogs to display
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	// get browser localStorage for logged user
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	})

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			
			window.localStorage.setItem(
				'loggedBlogUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addBlog = async (event) => {
		event.preventDefault()

		const blogObject = {
			title: title,
			author: author,
			url: url,
			likes: 0
		}

		setSuccessMessage(`a new blog ${title} by ${author}`)
		setTimeout(() => {
			setSuccessMessage(null)
		}, 5000)

		const returnedBlog = await blogService.create(blogObject)

		setBlogs(blogs.concat(returnedBlog))
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const successBox = () => (
		<div className="success">
			{successMessage}
		</div>
	)

	const formBlog = () => (
		<div>
			<div>
				<h4>{user.name} logged in</h4>
				<button onClick={() => {
					setUser(null);
					window.localStorage.removeItem('loggedBlogUser')
				}}>logout</button>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
			<form onSubmit={addBlog}>
				<h2>create new:</h2>
				<div>title:<input 
						type="text"
						valuie={title}
						name="Title"
						onChange={({target}) => setTitle(target.value)}
					/>	
				</div>
				<div>author:<input
						type="text"
						value={author}
						name="Author"
						onChange={({target}) => setAuthor(target.value)}
					/>
				</div>
				<div>url:<input 
						type="text"
						value={url}
						name="URL"
						onChange={({target}) => setUrl(target.value)}
					/>	
				</div>
				<button type="submit">add</button>
			</form>
		</div>
	)

	const loginForm = () => (
		<div>
		<form onSubmit={handleLogin}>
			<div>
				käyttäjätunnus
				<input 
					type="text"
					value={username}
					name="Username"
					onChange={({target}) => setUsername(target.value)}
				/>
			</div>
			<div>
				salasana
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({target}) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">kirjaudu</button>
		</form>
		</div>
	)

	return (
		<div>
			<h1>blogs</h1>
			<Notification message={errorMessage} />
			{successMessage !== null && successBox()}
			{user === null && loginForm()}
			{user !== null && formBlog()}
		</div>
	)
}

export default App