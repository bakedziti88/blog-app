import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, useHistory, Link } from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'

import Likes from './Likes'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

import { deletePost, likePost } from '../reducers/postReducer'
import { notify } from '../reducers/notificationReducer'
import { getPost } from '../reducers/fullPostReducer'

const Post = () => {
	
	const dispatch = useDispatch()
	
	const history = useHistory()
/*
	const location = useLocation()
	const parsed = queryString.parse(location.search)
*/

	const id = useParams().id
	
	const post = useSelector(state => state.posts.data.find(p => p.id === id))
	
	if (!post || Object.keys(post).length === 0) {
		return (
			<p>Select a post to view more about it</p>
		)
	}

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
				<h3>Comments</h3>
				
				<CommentList comments = {post.comments} />
				
				<CommentForm parentPost = {post.id}/>
				<Link to = '/posts'><button>Close (Refactor this later)</button></Link>
			</div>
		</div>
	)
}

export default Post