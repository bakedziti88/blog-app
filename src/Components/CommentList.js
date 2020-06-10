import React from 'react'

import OpenableDisplay from './OpenableDisplay'

const CommentList = ({comments}) => {
	
	
	if (comments.length === 0) {
		return (
			<p><em>No comments yet</em></p>
		)
	}
	return (
		<div className = "comments">
			<OpenableDisplay showLabel = {`Show ${comments.length} comment(s)`} hideLabel = 'Hide comment(s)'>
				{comments.map(comment => <p key = {comment.id}>{comment.body} by {comment.name} on {comment.created_at}</p>)}
			</OpenableDisplay>
		</div>
	)
}

export default CommentList