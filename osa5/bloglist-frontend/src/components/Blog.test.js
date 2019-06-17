import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
	const blog = {
		title: 'React test blog',
		author: 'the dev',
		url: 'localhost',
		likes: 2,
	}


	const component = render(
		<Blog blog={blog} />
	)

	// check for title
	expect(component.container).toHaveTextContent(
		'React test blog'
	)
})

test('clicking like 2 times sets 2 mock calls', () => {
	const blog = {
		title: 'Like test blog',
		author: 'the dev',
		url: 'localhost',
		likes: 0
	}

	const mockHandler = jest.fn()

	const { getByText } = render(
		<Blog blog={blog} handleLike={mockHandler} showState={true} /> 
	)   

	const button = getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)
})  

