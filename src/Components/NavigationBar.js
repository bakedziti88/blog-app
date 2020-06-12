import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/userReducer'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'


const NavigationBar = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	return (
		<div>
			<Link to = '/posts'><Tab label = 'All Posts' /></Link>
			<Link to = '/create'><Tab label = 'Create New Post' /></Link>
			<Link to = '/users'><Tab label = 'View Contributers' /></Link>
			{user && <Link to = {`/users/${user.id}`}><Tab label = 'Your Posts' /></Link>}
			{user ? <Link to = '/' onClick = {() => dispatch(logout())}><Tab label = 'Logout' /></Link> : <Link to = '/login'><Tab label = 'Login' /></Link>}
			{!user && <Link to = '/register'><Tab label = 'Register' /></Link>}
		</div>
	)
}

export default NavigationBar