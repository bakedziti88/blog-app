import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/userDataReducer'

const UserTable = () => {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.users)
	
	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])
	
	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Posts Created</th>
					</tr>
				</thead>
				<tbody>
					{userData.map(user => (
						<tr key = {user.id}>
							<td><Link to = {`/users/${user.id}`}>{user.name.first} {user.name.last}</Link></td>
							<td>{user.posts.length}</td>
						</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserTable