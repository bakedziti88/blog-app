import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

import LabeledTextInput from './LabeledTextInput'

import { createPost } from '../reducers/postReducer'

const CreatePostForm = () => {
	
	const dispatch = useDispatch()
	
	const [titleInput, setTitleInput] = useState('')
	const [authorInput, setAuthorInput] = useState('')
	const [urlInput, setUrlInput] = useState('')
	
	
	
	const titleInputProps = {
		name: 'title',
		label: 'title',
		value: titleInput,
		handler: ({target}) => {setTitleInput(target.value)},
		inputType: 'text'
	}
	const authorInputProps = {
		name: 'author',
		label: 'author',
		value: authorInput,
		handler: ({target}) => {setAuthorInput(target.value)},
		inputType: 'text'
	}
	const urlInputProps = {
		name: 'url',
		label: 'url',
		value: urlInput,
		handler: ({target}) => {setUrlInput(target.value)},
		inputType: 'text'
	}

	const ti = titleInputProps
	const ai = authorInputProps
	const ui = urlInputProps
	
	const createPostHandler = async (event) => {
		event.preventDefault()
		const newPost = {
			title: titleInput,
			author: authorInput,
			url: urlInput,
		}
		dispatch(createPost(newPost))
		setTitleInput('')
		setAuthorInput('')
		setUrlInput('')
	}
	
	return (
		<>
			<h2>Create New Posts Here</h2>
			<form onSubmit = {createPostHandler}>
				<LabeledTextInput name = {ti.name} inputType = {ti.inputType} value = {ti.value} label = {ti.label} handler = {ti.handler} />
				<br />
				<LabeledTextInput name = {ai.name} inputType = {ai.inputType} value = {ai.value} label = {ai.label} handler = {ai.handler} />
				<br />
				<LabeledTextInput name = {ui.name} inputType = {ui.inputType} value = {ui.value} label = {ui.label} handler = {ui.handler} />
				<br />
				<button type = "submit">Create Post</button>
			</form>
		</>
	)
}

export default CreatePostForm