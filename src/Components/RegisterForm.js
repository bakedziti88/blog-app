import React from 'react'
import { useDispatch } from 'react-redux'

import useField from '../hooks/useField'

import { createUser } from '../reducers/userDataReducer'

const RegisterForm = () => {
	const dispatch = useDispatch()
	
	const {setValue: setFirstName, ...firstName} = useField('text')
	const {setValue: setLastName, ...lastName} = useField('text')
	const {setValue: setUsername, ...username} = useField('text')
	const {setValue: setPassword, ...password} = useField('password')
	const {setValue: setConfirmPassword, ...confirmPassword} = useField('password')
	
	const attemptCreateUser = (event) => {
		event.preventDefault()
		//TODO: Add validation, probably do real time validation
		//TODO: Create full name to be sent to server
		//TODO: Send stuff to server and see if it saves
		try {
			/*
				request body should look something like this:
				{
					name: "John Doe",
					username: "Untaken username which we should validate both client and server side",
					password: "Valid password, but I don't think anyone's really trying to hack this site so I don't think
					there should be any restrictions besides a character minimum and maximum limit"
				}
			*/
			const fullName = `${firstName.value} ${lastName.value}`
			const userRequestBody = {
				name: fullName,
				username: username.value,
				password: password.value
			}
			
			dispatch(createUser(userRequestBody))
			
		} catch (e) {
			console.log(e.message)
		}
		//TODO: on catch, don't redirect
	}
	
	return (
		<div className = 'register'>
			<form onSubmit = {attemptCreateUser} >
				<label>First Name: </label><input {...firstName} /><br />
				<label>Last Name: </label><input {...lastName} /><br />
				<label>Choose a Username: </label><input {...username} /><br />
				<label>Make a Password: </label><input {...password} /><br />
				<label>Confirm the Password: </label><input {...confirmPassword} /><br />
				<button type = "submit">Create An Account</button>
			</form>
		</div>
	)
}

export default RegisterForm