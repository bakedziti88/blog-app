import userService from '../services/userService'

const userDataReducer = (state = [], action) => {
	if (action.type === 'INITIALIZE_USERS') {
		return action.data.users
	}
	else if (action.type === 'CREATE_USER') {
		//After studying the states a little bit, it would seem that this is kind of useless
		//The only time we need a list of users is to view "View Contributers"
		//But if you click on that link, it uses "INITIALIZE_USERS" so it's not technically necessary to update the state right here
		//Maybe I should remove this line and save some file space
		return state.concat(action.data.user)
	}
	else if (action.type === 'USER_DELETED_POST') {
		const affectedUser = state.find(user => user.id === action.data.userId)
		
		const updatedPostList = affectedUser.posts.filter(post => post.id !== action.data.postId)
		
		const updatedUser = {
			...affectedUser,
			posts: updatedPostList
		}
		
		return state.map(user => user.id === action.data.userId ? updatedUser : user)
	}
	else if (action.type === 'UPDATE_USER_AFTER_POST') {
		const affectedUser = state.find(user => user.id === action.data.userId)
		
		const updatedPostList = affectedUser.posts.map(post => post.id === action.data.updatedPost.id ? action.data.updatedPost : post)
		
		const updatedUser = {
			...affectedUser,
			posts: updatedPostList
		}
		
		return state.map(user => user.id === action.data.userId ? updatedUser : user)
	}
	return state
}

//I hope all the information is formatted correctly because I don't want to have to validate 3+ times everytime a function is called
export const createUser = (registerFormInfo) => {
	return async dispatch => {
		try {
			const savedUser = await userService.createUser(registerFormInfo)
			dispatch({
				type: 'CREATE_USER',
				data: {
					user: savedUser
				}
			})
		} catch (e) {
			console.log(e.response.data.error)
			//Don't change state if state doesn't need to be updated
		}
	}
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