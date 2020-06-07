import postService from '../services/postService'

const initialState = {
	order: null,
	data: []
}

const postReducer = (state = initialState, action) => {
	if (action.type === 'INITIALIZE') {
		return {
			...state,
			data: action.data
		}
	}
	else if (action.type === 'CREATE') {
		return {
			...state,
			data: state.data.concat(action.data.post)
		}
	}
	else if (action.type === 'DELETE') {
		return {
			...state,
			data: state.data.filter(s => s.id !== action.data.id)
		}
	}
	else if (action.type === 'LIKE') {
		const newPost = action.data.post
		return {
			...state,
			data: state.data.map(post => post.id === newPost.id ? newPost : post)
		}
	}
	else if (action.type === 'SORT') {
		return {
			...state,
			order: action.data.order
		}
	}
	return state
}

export const initialize = () => {
	return async dispatch => {
		const posts = await postService.getAllPosts()
		dispatch({
			type: 'INITIALIZE',
			data: posts
		})
	}
}

export const createPost = (post) => {
	return async (dispatch) => {
		const savedPost = await postService.createPost(post)
		
		dispatch({
			type: 'CREATE',
			data: {
				post: savedPost
			}
		})
	}
}

export const likePost = (id) => {
	return async (dispatch, getState) => {
		const state = getState()
		
		const oldPost = state.posts.data.find(post => post.id === id)
		const newPost = {
			...oldPost,
			likes: oldPost.likes + 1
		}
		
		/*Use this commented out line if you plan to update the store with the server's copy of the update post with the like*/
		/*I recommend using the copy created locally because then there can be no lag*/
		/*But there could be inconsistent results*/
		/*I think the best way really is to use the server's copy, but use a loading icon in case of slow internet*/
		
			
		//const savedPostFromServer = await postService.updatePost(newPost)
		await postService.updatePost(newPost)
		dispatch({
				type: 'LIKE',
				data: {
					post: newPost 
				}
			}
		)
		dispatch({
			type: 'OPEN_POST',
			data: {
				post: newPost
			}
		})
	}
}

export const deletePost = (id) => {
	return async (dispatch, getState) => {
		
		await postService.deletePost(id)
		dispatch({
			type: 'DELETE',
			data: {
				id
			}
		})
	}
}

export const sort = (order) => {
	return dispatch => {
		dispatch({
			type: 'SORT',
			data: {
				order
			}
		})
	}
}

export default postReducer