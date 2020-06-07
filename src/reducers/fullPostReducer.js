

const fullPostReducer = (state = {}, action) => {
	if (action.type === 'OPEN_POST') {
		return action.data.post
	}
	return state
}

export const getPost = (id) => {
	return (dispatch, getState) => {
		const state = getState()
		let post = state.posts.data.find(p => {
			return p.id === id
		})
		if (!post) {
			post = {}
		}
		dispatch({
			type: 'OPEN_POST',
			data: {
				post
			}
		})
	}
}

export default fullPostReducer