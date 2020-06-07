import React, { useState, useEffect } from 'react'
import queryString from 'query-string'

import Likes from './Likes'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'

import { deletePost, likePost } from '../reducers/postReducer'
import { notify } from '../reducers/notificationReducer'
import { getPost } from '../reducers/fullPostReducer'

const Post = ({post}) => {
	
	const dispatch = useDispatch()
	
	
	if (!post || Object.keys(post).length === 0) {
		return (
			<p>Select a post to view more about it</p>
		)
	}
	
	//const canDelete = JSON.parse(window.localStorage.getItem('logged-in-user')).id === (post.user.id || post.user) ? true : false
	const canDelete = true

	const postStyle = {
		border: '1px solid black',
		marginTop: '10px',
		padding: '5px 10px 20px 10px',
		width: '35%'
	}
	
	
	const deleteFunction = async (id) => {
		try {
			dispatch(deletePost(id))
		} catch(e) {
			console.log(e)
			dispatch(notify(e.response.data.error))
		}
	}
	
	const like = async (id) => {
		try {
			dispatch(likePost(id))
		}
		catch (e) {
			console.log(e.response.data.error)
			dispatch(notify(e.response.data.error, 'error', 5))
		}
	}
	
	
	
	return (
		<div className = 'post'>
			<div style = {postStyle}>
				{post.title} by {post.author}
				<p>{post.url}</p>
				<Likes id = {post.id} likes = {post.likes} addLike = {like} />
				<br />
				{canDelete && <button onClick = {() => deleteFunction(post.id)}>delete</button>}
				<button onClick = {() => dispatch(getPost(null))}>Close (Refactor this later)</button>
			</div>
		</div>
	)
}

export default Post