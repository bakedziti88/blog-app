import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import moment from 'moment'

import Likes from './Likes'
import CommentForm from './CommentForm'

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
	//const canDelete = true

	const postStyle = {
		border: '1px solid black',
		marginTop: '10px',
		padding: '5px 10px 20px 10px',
		width: '35%'
	}
	
	const deleteFunction = async (id) => {
		try {
			dispatch(deletePost(id))
			dispatch(getPost(null))
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
	
	//TODO: Figure out the right way to set the time zone, this is just not worth my time
	const formatDate = (iso_string) => {
		const s = moment(iso_string, 'YYYY-MM-DD HH:mm')
		s.add(-4, 'h')
		return s._d.toString()
	}
	
	return (
		<div className = 'post'>
			<div style = {postStyle}>
				{post.title} by {`${post.user.name.first} ${post.user.name.last}`} on {formatDate(post.created_at)}
				<p>{post.url}</p>
				<p>
				{post.body}
				</p>
				<Likes id = {post.id} likes = {post.likes} addLike = {like} />
				<br />
				<hr />
				<h4>Comments! Refactor this later into an actual component</h4>
				<h4>Comment form here. Make into openable display</h4>
				<CommentForm parentPost = {post.id}/>
				<button onClick = {() => dispatch(getPost(null))}>Close (Refactor this later)</button>
			</div>
		</div>
	)
}

export default Post