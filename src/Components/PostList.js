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

	const postList = () => {
		if (!posts)
			return null
		
		return (
			<>
				<Grid container spacing = {3}>
					<Grid item xs = {6}>
						{posts.map(post => <p key = {post.id}><Link to = {`/posts/${post.id}`}>{post.title}</Link></p>)}
					</Grid>
					<Grid item xs = {6}>
						<Post />
					</Grid>
				</Grid>
			</>
		)
	}
	
	return (
		<>
			<h2>Posts</h2>
			<ListOrder />
			<ul style = {postListStyle}>
				{postList()}
			</ul>
		</>
	)
}

export default PostList