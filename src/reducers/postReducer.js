import postService from '../services/postService'

const initialState = {
	order: 'DATE_DESC',
	data: []
}

const postReducer = (state = initialState, action) => {
	if (action.type === 'INITIALIZE_POSTS') {
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
	else if (action.type === 'UPDATE_POST') {
		return {
			...state,
			data: state.data.map(post => post.id === action.data.post.id ? action.data.post : post)
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
			type: 'INITIALIZE_POSTS',
			data: posts
		})
	}
}

export const editPost = (post) => {
	return async (dispatch, getState) => {
		const state = getState()
		const userId = state.users.find(user => user.id === post.user.id).id
		
		const updatedPost = await postService.updatePost(post)
		dispatch({
			type: 'UPDATE_POST',
			data: {
				post: updatedPost
			}
		})
		dispatch({
			type: 'UPDATE_USER_AFTER_POST',
			data: {
				updatedPost,
				userId
			}
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
		
		const state = getState()
		const userId = state.posts.data.find(post => post.id === id).user.id
		
		await postService.deletePost(id)
		dispatch({
			type: 'DELETE',
			data: {
				id
			}
		})
		dispatch({
			type: 'USER_DELETED_POST',
			data: {
				postId: id,
				userId
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