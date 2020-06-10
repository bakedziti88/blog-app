import React from 'react'
import { useDispatch } from 'react-redux'

import OpenableDisplay from './OpenableDisplay'

import useField from '../hooks/useField'

import {addComment} from '../reducers/postReducer'

const CommentForm = ({parentPost}) => {
	
	const dispatch = useDispatch()
	
	const {setValue: setName, ...name} = useField('text')
	const {setValue: setComment, ...comment} = useField('text')
	
	const formCommentHandler = (event) => {
		event.preventDefault()
		if (name.value.length < 0 || comment.value.length < 0) {
			//Some error handling here
		}
		else {
			const com = {
				name: name.value,
				body: comment.value
			}
			dispatch(addComment(parentPost, com))
			setName('')
			setComment('')
		}
	}
	
	return (
		<div className = 'comment-form'>
			<OpenableDisplay showLabel = 'Add a comment' hideLabel = 'Cancel'>
				<form onSubmit = {formCommentHandler}>
					<label htmlFor = "">name: </label><input {...name} />
					<label htmlFor = "">comment: </label><input {...comment} />
					<button type = "submit">Add Comment</button>
				</form>
			</OpenableDisplay>
		</div>
	)
}

export default CommentForm