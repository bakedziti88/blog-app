import { createSelector } from 'reselect'

const postSelector = state => state.posts.data
const orderSelector = state => state.posts.order

export const getPosts = createSelector(
	postSelector,
	orderSelector,
	(posts, order) => {
		if (order === 'NAME') {
			const sorted = posts.slice(0).sort((a, b) => {
				if (a.title.toUpperCase() < b.title.toUpperCase()) {
					return -1
				}
				else if (b.title.toUpperCase() < a.title.toUpperCase())
				{
					return 1
				}
				else
					return 0
			})
			return sorted
		}
		else if (order === 'LIKES') {
			const sorted = posts.slice(0).sort((a,b) => {
				return b.likes - a.likes
			})
			return sorted
		}
		return posts
	}
)