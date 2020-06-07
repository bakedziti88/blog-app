import loginService from '../services/login'
import postService from '../services/postService'

const userReducer = (state = null, action) => {
	
	if (action.type === 'LOGIN') {
		postService.setToken(action.data.user.token)
		window.localStorage.setItem('logged-in-user', JSON.stringify(action.data.user))
		return action.data.user
	}
	else if (action.type === 'LOGOUT') {
		window.localStorage.removeItem('logged-in-user')
		return null
	}
	else if (action.type === 'RESTORE') {
		const user = window.localStorage.getItem('logged-in-user')
		if (user) {
			const parsedUser = JSON.parse(user)
			postService.setToken(parsedUser.token)
			return parsedUser
		}
		return state
	}
	return state
}

export const login = (credentials) => {
	return async dispatch => {
		try {
			const user = await loginService.login(credentials)
			dispatch({
			type: 'LOGIN',
				data: {
					user
				}
			})
		}
		catch (e) {
			console.log(e.response.data.error)
			return
		}
	}
}

export const logout = () => {
	return async dispatch => {
		dispatch({
			type: 'LOGOUT'
		})
	}
}

export const restoreUser = () => {
	return dispatch => {
		dispatch({
			type: 'RESTORE'
		})
	}
}

export default userReducer