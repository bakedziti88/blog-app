import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Post from './Post'
import Likes from './Likes'

describe('<Post />', () => {
	let component
	const post = {
		title: 'test post title',
		author: 'test post author',
		url: 'test post url',
		likes: 0,
		id: 1,
		user: 2
	}
	const user = {
		id: 2,
		name: {
			first: 'test',
			last: 'test'
		}
	}
	
	const likeFunction = jest.fn()
	const deleteFunction = jest.fn()
	
	beforeEach(() => {
		component = render(
			<Post post = {post} likeFunction = {likeFunction} deleteFunction = {deleteFunction} />
		)
	})
	
	
	test('initial render of component does not show url or likes', () => {
		expect(component.container.querySelector('.postDetails')).toHaveStyle('display: none')
	})
	
	test('show button displays rest of post', () => {
		const showButton = component.getByText('Show')
		fireEvent.click(showButton)
		
		expect(component.container.querySelector('.postDetails')).not.toHaveStyle('display: none')
	})
	
})

describe('<Likes />', () => {
	const id = 1
	const addLike = jest.fn()
	const likes = 0
	
	test('like button clicked twice', () => {
		const component = render(
		<Likes id = {id} addLike = {addLike} likes = {likes} />
	)
	
		const likeButton = component.getByText('Like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)
		
		expect(addLike.mock.calls).toHaveLength(2)
	})
})