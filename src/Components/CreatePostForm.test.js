import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import CreatePostForm from './CreatePostForm'

describe('<CreatePostForm />', () => {

	test('form submits with proper object', () => {
		const formHandler = jest.fn()
		const component = render(
			<CreatePostForm formHandler = {formHandler}/>
		)
		
		const form = component.container.querySelector('form')
		
		const title = component.container.querySelector('#title')
		fireEvent.change(title, {
			target: {
				value: 'title has been changed'
			}
		})
		const author = component.container.querySelector('#author')
		
		fireEvent.change(author, {
			target: {
				value: 'author has been changed'
			}
		})
		const url = component.container.querySelector('#url')
		fireEvent.change(url, {
			target: {
				value: 'url has been changed'
			}
		})
		
		fireEvent.submit(form)
		
		expect(formHandler.mock.calls).toHaveLength(1)
		expect(formHandler.mock.calls[0][0].title).toBe('title has been changed')
		expect(formHandler.mock.calls[0][0].author).toBe('author has been changed')
		expect(formHandler.mock.calls[0][0].url).toBe('url has been changed')
	})
})