import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import userService from '../services/userService'

const UserView = () => {
	
	const dispatch = useDispatch()
	const id = useParams().id
	
	const user = useSelector(state => state.users.find(user => user.id === id))
	
	const loggedInUser = useSelector(state => state.user)
	const isLoggedInUser = (loggedInUser && user) ? loggedInUser.id === user.id : false
	
	if (!user) {
		return <p>User not found</p>
	}
	
	const listPost = (post) => {
		return(
			<div key = {post.id}>
				<li>
					<Link to = {`/posts/${post.id}`}>{post.title}</Link>
					{isLoggedInUser && <Link to = {`/edit/${post.id}`}><button>Edit Post</button></Link>}
				</li>
			</div>
		)
	}
	
	const view = () => {
		return (
			<>
				<h2>Posts by {user.name.first + ' ' + user.name.last}</h2>
				{user.posts.length > 0 ?
				<ul>
					{user.posts.map(post => listPost(post))}
				</ul>
				:
				<p>{`${user.name.first} ${user.name.last} does not have any posts`}</p>
				}
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