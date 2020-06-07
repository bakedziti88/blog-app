import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import LabeledTextInput from './LabeledTextInput'

import {login} from '../reducers/userReducer'

const LoginForm = () => {
	
	const dispatch = useDispatch()
	
	const [usernameInput, setUsernameInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	
	const usernameInputProps = {
		name: 'username',
		label: 'username',
		value: usernameInput,
		handler: ({target}) => {setUsernameInput(target.value)},
		inputType: 'text'
	}
	const passwordInputProps = {
		name: 'password',
		label: 'password',
		value: passwordInput,
		handler: ({target}) => {setPasswordInput(target.value)},
		inputType: 'password'
	}
	
	const formHandler = async (event) => {
		event.preventDefault()
		console.log('logging in with', usernameInput, passwordInput)
		
		const credentials = {
			username: usernameInput,
			password: passwordInput
		}
		
		dispatch(await login(credentials))
		setUsernameInput('')
		setPasswordInput('')
	}
	
	const ui = usernameInputProps
	const pi = passwordInputProps
	
	return (
		<>
		<form onSubmit = {formHandler}>
			<LabeledTextInput inputType = {ui.inputType} name = {ui.name} value = {ui.value} handler = {ui.handler} label = {ui.label}/>
			<br />
			<LabeledTextInput inputType = {pi.inputType} name = {pi.name} value = {pi.value} handler = {pi.handler} label = {pi.label}/>
			<br />
			<button type = 'submit'>Log In</button>
		</form>
		</>
	)
}

export default LoginForm