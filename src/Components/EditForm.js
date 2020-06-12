import React, { useEffect } from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import useField from '../hooks/useField'

import { editPost } from '../reducers/postReducer'
import { deletePost } from '../reducers/postReducer'

const EditForm = () => {
	const id = useParams().id
	
	const dispatch = useDispatch()
	const history = useHistory()
	const post = useSelector(state => state.posts.data.find(post => post.id === id))
	const loggedInUser = useSelector(state => state.user)
	
	const {setValue: setTitle, ...title} = useField('text')
	const {setValue: setBody, ...body} = useField('text')
	
	useEffect(() => {
		setTitle(post ? post.title : '')
		setBody(post ? post.body : '')
	}, [post])
	
	if (loggedInUser && post) {
		if (loggedInUser.id !== post.user.id) {
			return (
				<Redirect to = '/posts' />
			)
		}
	}
	
	if (!post) {
		return (
			<p>The post cannot be found</p>
		)
	}
	
	const handleUpdate = (event) => {
		event.preventDefault()
		const newPost = {
			...post,
			title: title.value,
			body: body.value
		}
		try {
			dispatch(editPost(newPost))
			//TODO: Dispatch some notification
			history.push(`/posts/${post.id}`)
		} catch (e) {
			console.log(e.response.data)
		}
	}
	const deleteFunction = (id) => {
		const c = window.confirm('Are you sure you want to delete this post? You will not be able to recover this later')
		if (c) {
			dispatch(deletePost(id))
			history.push(`/users/${loggedInUser.id}`)
		}
	}
	
	return (
		<div className = "editPost">
			<form onSubmit = {handleUpdate}>
				<label>Title: </label><input {...title} /><br />
				<label>Body: </label><textarea {...body} ></textarea><br />
				<button>Update Post</button>
				<button type = 'button' onClick = {() => {history.push(`/users/${loggedInUser.id}`)}}>Cancel</button>
				<button onClick = {() => {deleteFunction(post.id)}}>Delete Post</button>
			</form>
		</div>
	)
}

export default EditForm