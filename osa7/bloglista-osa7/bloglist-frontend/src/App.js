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
	Route
} from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/allUsersReducer'
import UserView from './components/UserView'
import { Button } from 'react-bootstrap'
import Navbar from "./components/NavBar"

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
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			props.alreadyLoggedIn(user)
		}
		props.alreadyLoggedIn(null)
	})

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
		props.createBlog(blogObject)
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

	const userById = (id) => 
		props.users.find(u => u.id === id)

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

	const giveLogoutButton = (user) => {
		if (user === null) {
			return false
		}
		return true
	}

	const Main = () => {
		if (user === null) {
			return null
		}
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
			<Router>
				<Navbar showLogOut={giveLogoutButton(user)} />
				<div className="container">
				<Notification />
				<Route exact path="/" render={() => <Main />} />
				<Route exact path="/users" render={() => <Users /> } />
				<Route path="/users/:id" render={({ match }) => 
					<UserView user={userById(match.params.id)} />
				} />
				{user === null ? <Route exact path="/" render={() =>  <LoginForm 
				username={username}
				password={password}
				handleSubmit={handleLogin}
				/>} /> : 
				<Route exact path="/" render={() => <Togglable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm 
						onSubmit={addBlog}
						title={title}
						author={author}
						url={url}
					/>
				</Togglable> }/>}
				</div>
			</Router>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user,
		users: state.allUsers
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