// commented some of the code so I can come back to it
import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs, addLike, createBlog } from './reducers/blogReducer'
import { logIn, logOut, alreadyLoggedIn } from './reducers/userReducer'
import { 
	BrowserRouter as Router,
	Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/allUsersReducer'

const App = (props) => {
	// general variable, hook and state definitions
	const username = useField('text')
	const password = useField('password')
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')
	const blogFormRef = React.createRef()
	const blogs = props.blogs
	const user = props.user

	useEffect(() => {
		// fetch users list and blogs list
		props.initializeBlogs()
		props.initializeUsers()

		// check if the there is a user logged in localStorage
		props.alreadyLoggedIn()
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const credentials = {
				username: username.value,
				password: password.value
			}
			// send login
			props.logIn(credentials)

			// clear fields
			username.reset()
			password.reset()
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
		// to the back-end
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
	const byLikes = (b1, b2) => b2.likes - b1.likes
	const sortedBlogs = props.blogs.sort(byLikes)

	const Main = () => {
		if (user === null) {
			return (
				<LoginForm 
					username={username}
					password={password}
					handleSubmit={handleLogin}
				/>
			)
		}
		return (
			<div>
				<p>{user.name} logged <button onClick={() => {
					props.logOut()
				}}>logout</button></p>
				<Togglable buttonLabel='new blog' ref={blogFormRef}>
					<BlogForm 
						onSubmit={addBlog}
						title={title}
						author={author}
						url={url}
					/>
				</Togglable>
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
			<Router>
				<Link to="/">Home</Link>
				<Link to="/users">Users</Link>
				<Route exact path="/" render={() => <Main />} />
				<Route exact path="/users" render={() => <Users /> } />
			</Router>
			<LoginForm 
				username={username}
				password={password}
				handleSubmit={handleLogin}
			/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user
	}
}

const mapDispatchToProps = {
	initializeBlogs,
	setNotification,
	clearNotification,
	addLike,
	createBlog,
	logIn,
	logOut,
	initializeUsers,
	alreadyLoggedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App)