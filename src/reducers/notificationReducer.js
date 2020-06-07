const notificationReducer = (state = {msg: '', id: null, type: null}, action) => {
	if (action.type === 'NOTIFY') {
		if (state.id !== null) {
			clearTimeout(state.id)
		}
		return {
			type: action.data.type,
			msg: action.data.msg,
			id: action.data.id
		}
	}
	else if (action.type === 'CLEAR') {
		return {
			msg: '',
			type: null,
			id: null
		}
	}
	return state
}

export const notify = (msg, type, timeout = 5) => {
	return dispatch => {
		
		const timerId = setTimeout(() => {
			dispatch(clear())
		}, timeout * 1000)
		
		dispatch({
			type: 'NOTIFY',
			data: {
				msg,
				type,
				id: timerId
			}
		})
	}
}

export const clear = () => {
	return {
		type: 'CLEAR'
	}
}

export default notificationReducer