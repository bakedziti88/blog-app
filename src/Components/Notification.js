import React from 'react'

const Notification = (props) => {
	const notificationCSS = {
		width: '100%',
		fontSize: '36px',
		padding: "20px 10px 20px 10px",
		border: '2px solid green'
	}
	if (props.type === 'error')
	{
		notificationCSS.border = '2px solid red'
	}
	return (
		<div style = {notificationCSS}>{props.message}</div>
	)
}

export default Notification