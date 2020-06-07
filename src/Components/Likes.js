import React from 'react'

const Likes = ({id, likes, addLike}) => {
	const button = {
		marginLeft: '20px'
	}
	
	const finishSentence = likes === 1 ? 'person' : 'people'
	
	return(
		<div>
			{`Liked by ${likes} ${finishSentence}`}
			<button style = {button} onClick = {() => {addLike(id)}}>Like</button>
		</div>
	)
}

export default Likes