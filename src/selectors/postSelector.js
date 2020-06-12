import { createSelector } from 'reselect'

const postSelector = state => state.posts.data
const orderSelector = state => state.posts.order

export const getPosts = createSelector(
	postSelector,
	orderSelector,
	(posts, order) => {
		if (order && order.substring(0,4) === 'NAME') {
			const sorted = posts.slice(0).sort((a, b) => {
				if (order.substring(5) === 'ASC') {
					return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
				}
				return a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1
			})
			return sorted
		}
		else if (order && order.substring(0,5) === 'LIKES') {
			const sorted = posts.slice(0).sort((a,b) => {
				if (order.substring(6) === 'ASC') {
					return b.likes - a.likes
				}
				return a.likes - b.likes
			})
			return sorted
		}
		else if (order && order.substring(0,4) === 'DATE') {
			const sorted = posts.slice(0).sort((a,b) => {
				//Date ascending should be smallest dates displayed at the top, basically, older posts first
				if (order.substring(5) === 'ASC') {
					return b.created_at < a.created_at ? 1 : -1
				}
				
				//Date descending (default order) should be most recent posts
				return b.created_at > a.created_at ? 1 : -1
			})
			return sorted
		}
		return posts
	}
)