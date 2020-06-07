import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const OpenableDisplay = React.forwardRef((props, ref) => {
	
	const [hidden, setHidden] = useState(true)
	
	const hideContent = {display: hidden ? 'none' : 'block'}
	const exposeContent = {display: hidden ? 'block' : 'none'}
	
	const toggleHidden = () => {
		setHidden(!hidden)
	}
	
	
	useImperativeHandle(ref, () => {
		return {
			toggleHidden
		}
	})
	
	return (
		<div>
			<div style = {exposeContent}>
				<button onClick = {toggleHidden}>{props.showLabel}</button>
			</div>
			<div style = {hideContent}>
				{props.children}
				<button onClick = {toggleHidden}>{props.hideLabel}</button>
			</div>
		</div>
	)
})

OpenableDisplay.propTypes = {
	showLabel: PropTypes.string.isRequired,
	hideLabel: PropTypes.string.isRequired
}

export default OpenableDisplay