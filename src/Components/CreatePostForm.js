import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

import LabeledTextInput from './LabeledTextInput'

import { createPost } from '../reducers/postReducer'

const CreatePostForm = () => {
	
	const dispatch = useDispatch()
	
	const [titleInput, setTitleInput] = useState('')
	const [bodyInput, setBodyInput] = useState('')
	
	const titleInputProps = {
		name: 'title',
		label: 'title',
		value: titleInput,
		handler: ({target}) => {setTitleInput(target.value)},
		inputType: 'text'
	}

	const ti = titleInputProps
	
	
	//TODO: Create some sort of notification to let them know post was created ok
	const createPostHandler = async (event) => {
		event.preventDefault()
		const newPost = {
			title: titleInput,
			body: bodyInput
		}
		dispatch(createPost(newPost))
		setTitleInput('')
		setBodyInput('')
	}
	
	
	//TODO: Use an actual text editor rather than text area, consider editor.js. Do this at the end when making site look nice
	return (
		<>
			<h2>Create New Posts Here</h2>
			<form onSubmit = {createPostHandler}>
				<LabeledTextInput name = {ti.name} inputType = {ti.inputType} value = {ti.value} label = {ti.label} handler = {ti.handler} />
				<br />
				<label htmlFor = 'body'>Post: </label>
				<textarea onChange = {({target}) => setBodyInput(target.value)} id = 'body' value = {bodyInput}></textarea>
				<br />
				<button type = "submit">Create Post</button>
			</form>
		</>
	)
}

export default CreatePostForm