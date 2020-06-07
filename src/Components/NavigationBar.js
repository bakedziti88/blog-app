import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'


const NavigationBar = () => {
	return (
		<div>
			<Link to = '/posts'><Tab label = 'All Posts' /></Link>
			<Link to = '/create'><Tab label = 'Create New Post' /></Link>
			<Link to = '/users'><Tab label = 'View Contributers' /></Link>
		</div>
	)
}

export default NavigationBar