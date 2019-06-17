import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
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
})