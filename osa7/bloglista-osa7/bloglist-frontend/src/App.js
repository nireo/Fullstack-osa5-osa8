// commented some of the code so I can come back to it
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs, addLike, createBlog } from './reducers/blogReducer'

const App = (props) => {
	// general variable, hook and state definitions
	const username = useField('text')
	const password = useField('password')
	const [user, setUser] = useState(null)
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')
	const blogFormRef = React.createRef()
	const blogs = props.blogs

	// get blogs to display
	useEffect(() => {
		props.initializeBlogs()
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
			// use credentials
			const user = await loginService.login({
				username: username.value, 
				password: password.value,
			})

			// set the localStorage for keeping user logged in 
			window.localStorage.setItem(
				'loggedBlogUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			// set user with state
			setUser(user)
		} catch (exception) {
			// if wrong credentials, since back-end doesn't
			// recognise items and throws an error
			props.setNotification('wrong username or password', 3)
		}
	}

	const addBlog = async (event) => {
		event.preventDefault()



		// place all values to 1 object since axios only sends 1 object
		const blogObject = {
			title: title.value,
			author: author.value,
			url: url.value,
			likes: 0
		}


		// if all went well display message
		props.setNotification(`you added blog ${title.value} by ${author.value}`, 5)

		// wait for the service method to successfully send the new object 
		// to the back end
		const returnedBlog = await blogService.create(blogObject)
		props.createBlog(returnedBlog)

		// clear the input fields
		title.reset()
		author.reset()
		url.reset()
	}

	const handleLike = id => {
		// find specific object from all of the objects
		const blog = blogs.find(b => b.id === id)

		// call axios method to send the updated blog to the back-end
		props.addLike(blog)
	}

	const handleRemove = async id => {
		// find specific blog since every blog has unique id
		const blog = blogs.find(b => b.id === id)

		// request confirmation from user to prevent accidental deletes
		if (window.confirm(`are you sure you want to delete ${blog.title} by ${blog.author}`)) {
			// wait for axios method 
			await blogService.remove(blog)

			// after that filter blogs that don't have the given id
			props.initializeBlogs(blogs.filter(blog => blog.id !== id))
		}
	}

	// the blog form component
	const formBlog = () => (
		<Togglable buttonLabel='new blog' ref={blogFormRef}>
			<BlogForm 
				onSubmit={addBlog}
				title={title}
				author={author}
				url={url}
			/>
		</Togglable>
	)

	// login form component
	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm 
				username={username}
				password={password}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)	
	
	const byLikes = (b1, b2) => b2.likes - b1.likes
	const sortedBlogs = props.blogs.sort(byLikes)
	
	const renderBlogs = () => {
		return (
			<div>
				<h2>Blogs:</h2>
				{sortedBlogs.map(blog =>
					<Blog key= {blog.id } blog={ blog } handleLike={ handleLike } handleRemove={ handleRemove } showState={false} />
				)}
			</div>
		)
	}

	return (
		<div>
			<h1>blogs</h1>
			<Notification />
			{ 
				// check if there is logged in user
				// if it finds a logged user in localStorage or 
				// user inputs correct credentials
				// then render menu with blogs and a logout button
			}
			{user === null ?
				loginForm() :
				<div>
					<p>{user.name} logged <button onClick={() => {
						localStorage.clear()
						setUser(null)
					}}>logout</button></p>
					{formBlog()}
					{renderBlogs()}
				</div>
			}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	initializeBlogs,
	setNotification,
	clearNotification,
	addLike,
	createBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)