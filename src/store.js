import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import userDataReducer from './reducers/userDataReducer'

const reducer = combineReducers({
	posts: postReducer,
	user: userReducer,
	notification: notificationReducer,
	users: userDataReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store