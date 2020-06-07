import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import queryString from 'query-string'

import Grid from '@material-ui/core/Grid'

import ListOrder from './ListOrder'
import Post from './Post'
import HalfPost from './HalfPost'

import { getPosts } from '../selectors/postSelector'
import { initialize } from '../reducers/postReducer'
import { getPost } from '../reducers/fullPostReducer'

const PostList = () => {
	
	/*CSS STUFF*/
	const postListStyle = {
		listStyle: 'none',
		margin: "auto",
		fontFamily: 'sans-serif'
	}
	
	//******************************************//
	
	const dispatch = useDispatch()
	const posts = useSelector(getPosts)
	
	const post = useSelector(state => state.fullPost)
	const pid = queryString.parse(useLocation().search).pid
	
	//For later routing
/*
	const match = useRouteMatch('/posts/:id')
	const routedPost = match ? posts.find(p => p.id === match.params.id) : null
	console.log(match)
*/
	
	
	
	
	//TODO: Probably have to make this async so we don't need to check if posts are null.
	useEffect(() => {
		dispatch(initialize())
	}, [dispatch])
	
	useEffect(() => {
		dispatch(getPost(pid))
	}, [dispatch])
/*
	
	useEffect(() => {
		const queryPost = pid ? posts.find(p => p.id === pid) : {}
		
		console.log('////')
		console.log(posts[2])
		console.log(pid)
		console.log('////')
		
		
		setHalfPost(queryPost)
	}, [posts])
*/
	
	const postList = () => {
		
		console.log(posts)
		
		if (!posts)
			return null
		
		return (
			<>
				<Grid container spacing = {3}>
					<Grid item xs = {6}>
						{posts.map(post => <p key = {post.id} onClick = {() => dispatch(getPost(post.id))}><Link to = {`/posts?pid=${post.id}`}>{post.title} by {post.author}</Link></p>)}
					</Grid>
					<Grid item xs = {6}>
						<Post post = {post} />
					</Grid>
				</Grid>
			</>
		)
	}
	
	return (
		<>
			<ListOrder/>
			<h2>Posts</h2>
			<Switch>
				<Route path = '/posts/'>
					<ul style = {postListStyle}>
						{postList()}
					</ul>
				</Route>
				<Route path = '/posts/:id'>
					<Post />
				</Route>
			</Switch>
		</>
	)
}

export default PostList