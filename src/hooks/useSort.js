import {useState} from 'react'

const useSort = (sortType) => {
	const [order, setOrder] = useState('ASC')
	const symbol = order === 'ASC' ? '&#x25B4;' : '&#x25BE;'
	
	const toggle = () => {
		if (order === 'ASC') {
			setOrder('DESC')
		}
		else {
			setOrder('ASC')
		}
	}
	const type = `${sortType}_${order}`
	return {
		order, toggle, type, symbol
	}
}

export default useSort