import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from './components/Togglable';

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
	const blogFormRef = React.createRef()

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
			console.log(user)
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

	const handleLike = id => {

		const blog = blogs.find(b => b.id === id)
		const changedBlog = {...blog, likes: blog.likes + 1}

		blogService.update(changedBlog)
			.then(returnedBlog => {
				setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
			}) 
	}

	const handleRemove = async id => {
		const blog = blogs.find(b => b.id === id)
		if (user.username === blog.user.username) {
			if (window.confirm(`are you sure you want to delete ${blog.title} by ${blog.author}`)) {
				await blogService.remove(blog)
				setBlogs(blogs.filter(blog => blog.id !== id))
			}
		}
	}

	const formBlog = () => (
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<BlogForm 
				onSubmit={addBlog}
				title={title}
				author={author}
				url={url}
				handleTitle={({target}) => setTitle(target.value)}
				handleAuthor={({target}) => setAuthor(target.value)}
				handleUrl={({target}) => setUrl(target.value)}
			/>
		</Togglable>
	)

	const loginForm = () => (
		<Togglable buttonLabel="login">
			<LoginForm 
				username={username}
				password={password}
				handleUsernameChange={({target}) => setUsername(target.value)}
				handlePasswordChange={({target}) => setPassword(target.value)}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)

	const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)

	return (
		<div>
			<h1>blogs</h1>
			<Notification message={errorMessage} />
			{successMessage !== null && successBox()}
			
			{user === null ?
				loginForm() :
				<div>
					<p>{user.name} logged <button onClick={() => {
						localStorage.clear();
						setUser(null)
					}}>logout</button></p>
					{formBlog()}
				</div>
			}

			<h2>Blogs:</h2>
			{sortedBlogs.map(blog =>
				<Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
			)}
		</div>
	)
}

export default App