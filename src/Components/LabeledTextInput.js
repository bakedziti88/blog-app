import React from 'react'

const LabeledTextInput = (props) => {
	return (
		<>
			<label htmlFor = {props.name}>{props.label + ': '}
				<input type = {props.inputType} name = {props.name} value = {props.value} onChange = {props.handler} id = {props.name}/>
			</label>
		</>
	)
}

export default LabeledTextInput