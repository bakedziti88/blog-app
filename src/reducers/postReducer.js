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
	else if (action.type === 'ADD_COMMENT') {
		const comment = action.data.comment
		const id = action.data.parentPost
		
		if (comment && id) {
			const affectedPost = state.data.find(p => p.id === id)
			const updatedPost = {
				...affectedPost,
				comments: affectedPost.comments.concat(comment)
			}
			return {
				...state,
				data: state.data.map(post => post.id === id ? updatedPost : post)
			}
		}
		else {
			return state
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
		
		const savedPostFromServer = await postService.likePost(newPost)
		
		console.log(savedPostFromServer)
		dispatch({
			type: 'LIKE',
			data: {
				post: savedPostFromServer
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

export const addComment = (id, comment) => {
	return async dispatch => {
		try {
			const res = await postService.addComment(id, comment)
			dispatch({
				type: 'ADD_COMMENT',
				data: {
					comment: res.comment,
					parentPost: id
				}
			})
		}
		catch (e) {
			console.log(e.message)
		}
	}
}


export default postReducer