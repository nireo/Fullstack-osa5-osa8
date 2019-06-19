import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('./setupTests.js')
import App from './App'

afterEach(cleanup)

describe('App />', () => {
	test('if no user logged, blogs are not rendered', async () => {
		const component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(
			() => component.getByText('login')
		)

		expect(component.container).toHaveTextContent('login')
		expect(component.container).not.toHaveTextContent('Blogs:')
	})
    
	test('if user has logged in, display blogs', async () => {
		const component = render(
			<App />
		)
		const user = {
			username: 'testi2',
			token: 'awdaiajwdoij',
			name: 'Donald Tester'
		}
		await localStorage.setItem('loggedBlogUser', JSON.stringify(user))

		component.rerender(<App />)
        
		expect(component.container).toHaveTextContent('Blogs:')
	})
})