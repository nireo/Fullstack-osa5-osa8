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

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
	
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('käyttäjätunnus tai salasana virheellinen')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const showBlogs = () => (
		<div>
			<h2>{user.name} logged in</h2>
			<button onClick={() => setUser(null)}>kirjaudu ulos</button>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
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
			{user === null && loginForm()}
			{user !== null && showBlogs()}
		</div>
	)
}


export default App