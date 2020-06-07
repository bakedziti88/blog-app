import userService from '../services/userService'

const userDataReducer = (state = [], action) => {
	if (action.type === 'INITIALIZE_USERS') {
		return action.data.users
	}
	return state
}

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getUsers()
		dispatch({
			type: 'INITIALIZE_USERS',
			data: {
				users
			}
		})
	}
}

export default userDataReducer