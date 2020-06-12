import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { sort } from '../reducers/postReducer'

import useSort from '../hooks/useSort'

const ListOrder = () => {
	
	const name = useSort('NAME')
	const likes = useSort('LIKES')
	const date = useSort('DATE')
	
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
				<button style = {buttonCSS} onClick = {() => {dispatch(sort(name.type)); name.toggle()}}>Alphabetical {name.symbol}</button>
				<button style = {buttonCSS} onClick = {() => {dispatch(sort(likes.type)); likes.toggle()}}>Likes</button>
				<button style = {buttonCSS} onClick = {() => {dispatch(sort(date.type)); date.toggle()}}>Date</button>
			</div>
		</div>
	)
}

export default ListOrder