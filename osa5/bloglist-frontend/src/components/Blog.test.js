import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
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

    expect(component.container).toHaveTextContent(
        'React test blog'
    )
})