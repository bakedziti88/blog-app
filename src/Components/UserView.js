import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import userService from '../services/userService'

import { initializeUsers } from '../reducers/userDataReducer'

const UserView = () => {
	const [user, setUser] = useState(null)
	const id = useParams().id
	
	console.log(user)
	
	useEffect(() => {
		const findUser = async () => {
			setUser(await userService.getUser(id))
		}
		findUser()
	}, [])
	
	const view = () => {
		return (
			<>
				<h2>Posts by {user.name.first + ' ' + user.name.last}</h2>
				<ul>
					{user.posts.map(post => <li key = {post.id}><Link to = {`/posts/${post.id}`}>{post.title}</Link></li>)}
				</ul>
			</>
		)
	}
	
	return (
		<div>
			{user ? view() : 'User not found!'}
		</div>
	)
}

export default UserView