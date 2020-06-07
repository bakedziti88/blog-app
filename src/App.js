import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'

import NavigationBar from './Components/NavigationBar'
import LoginForm from './Components/LoginForm'
import PostList from './Components/PostList'
import CreatePostForm from './Components/CreatePostForm'
import Notification from './Components/Notification'
import OpenableDisplay from './Components/OpenableDisplay'
import UserTable from './Components/UserTable'
import UserView from './Components/UserView'

import { logout, restoreUser } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'


const App = () => {
	
	const body = {
		fontFamily: 'sans-serif'
	}
	
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const notification = useSelector(state => state.notification)
	
	
	const logoutHandler = () => {
		dispatch(logout())
		dispatch(notify('Logged out successfully!', 'ok', 3))
	}
	
	useEffect(() => {
		dispatch(restoreUser())
	}, [dispatch])
	
	const debug = {
		border: '1px solid black'
	}
	
	const postsRoute = () => {
		return (
			<div>
				<Grid container spacing = {2}>
					<Grid item xs = {12}>
						<PostList />
					</Grid>
				</Grid>
			</div>
		)
	}
	
	const listPosts = () => {
		return (
			<>
				<h3>Welcome back, {user.name.first}</h3>
				{ user && <button onClick = {logoutHandler}>Log Out</button> }
				<Switch>
					<Route path = '/posts'>
						{postsRoute()}
					</Route>
					<Route path = '/create'>
						<OpenableDisplay showLabel = 'Create Post' hideLabel = 'Cancel'>
							<CreatePostForm />
						</OpenableDisplay>
					</Route>
					<Route path = '/users/:id'>
						<UserView />
					</Route>
					<Route path = '/users'>
						<UserTable />
					</Route>
					
				</Switch>
			</>
		)
	}
	
	return (
		<div style = {body}>
			{notification.msg && <Notification message = {notification.msg} type = {notification.type} />}
			<Router>
				<NavigationBar />
				<h1>Cooking Blog App With Recipes :)</h1>
				{ user === null ? <LoginForm /> : listPosts() }
			</Router>
		</div>
	)
}

export default App
