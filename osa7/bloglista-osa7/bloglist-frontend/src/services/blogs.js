import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async (url) => {
	const response = await axios.get(url)
	return response.data
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update =  newObject => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
	return request.then(response => response.data)
}

const remove = async newObject => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
	return response.data
}

export default { getAll, setToken, create, update, remove }
