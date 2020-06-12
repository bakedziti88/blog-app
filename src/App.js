import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter as Router, Switch, Link, Route, Redirect} from 'react-router-dom'

import Grid from '@material-ui/core/Grid'

import NavigationBar from './Components/NavigationBar'
import LoginForm from './Components/LoginForm'
import PostList from './Components/PostList'
import CreatePostForm from './Components/CreatePostForm'
import Notification from './Components/Notification'
import OpenableDisplay from './Components/OpenableDisplay'
import UserTable from './Components/UserTable'
import UserView from './Components/UserView'
import RegisterForm from './Components/RegisterForm'
import EditForm from './Components/EditForm'

import { logout, restoreUser } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import { initialize } from './reducers/postReducer'
import { initializeUsers } from './reducers/userDataReducer'


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
	
	useEffect(() => {
		/*
			You might be wondering why I choose to initialize both users and posts, if we're only dealing with users on this page
			If you don't initialize posts, you run into the problem of not being able to delete a post properly, because
			it won't be in the store to begin with. Therefore, on the first render, we need to make sure there's something in both
			posts and users state.
		*/
		dispatch(initializeUsers())
		dispatch(initialize())
	}, [])
	
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
	
	const appContent = () => {
		return (
			<>
				{ user && <h3>Welcome back, {user.name.first}</h3> }
				<Switch>
					<Route path = '/posts/:id'>
						{postsRoute()}
					</Route>
					<Route path = '/posts'>
						{postsRoute()}
					</Route>
					<Route path = '/create'>
						{ user === null ? <Redirect to = '/login'/> : <CreatePostForm /> }
					</Route>
					<Route path = '/users/:id'>
						<UserView />
					</Route>
					<Route path = '/users'>
						<UserTable />
					</Route>
					<Route path = '/login'>
						{user ? <Redirect to = '/posts' /> : <LoginForm />}
					</Route>
					<Route path = '/register'>
						{user ? <Redirect to = '/posts' /> : <RegisterForm />}
					</Route>
					<Route path = '/edit/:id'>
						<EditForm />
					</Route>
					<Route path = '*'>
						<p>404 Not found</p>
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
				{ appContent() }
			</Router>
		</div>
	)
}

export default App
