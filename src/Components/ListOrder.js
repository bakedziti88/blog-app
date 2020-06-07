import React from 'react'
import { useDispatch } from 'react-redux'

import { sort } from '../reducers/postReducer'

const ListOrder = () => {
	const bodyCSS = {
		border: '1px solid black',
		width: '35%',
		padding: '20px'
	}
	const buttonCSS = {
		marginRight: '20px'
	}
	const center = {
		margin: '0 auto'
	}
	
	const dispatch = useDispatch()
	
	return (
		<div style = {bodyCSS}>
			<div style = {center}>
				<span>Order by: </span>
				<button style = {buttonCSS} onClick = {() => {dispatch(sort('NAME'))}}>Recipe Name</button>
				<button style = {buttonCSS} onClick = {() => {dispatch(sort('LIKES'))}}>Popularity</button>
			</div>
		</div>
	)
}

export default ListOrder