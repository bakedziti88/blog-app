import axios from 'axios'

const baseurl = '/api/posts'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAllPosts = async () => {
	const posts = await axios.get(baseurl)
	return posts.data
}

const createPost = async (post) => {
	const config = {
		headers: {
			Authorization: token
		}
	}
	const response = await axios.post(baseurl, post, config)
	return response.data
}

const updatePost = async (post) => {
	const config = {
		headers: {
			Authorization: token
		}
	}
	const response = await axios.put(`${baseurl}/${post.id}`, post, config)
	return response.data
}

const deletePost = async (id) => {
	const config = {
		headers: {
			Authorization: token
		}
	}
	const response = axios.delete(`${baseurl}/${id}`, config)
	return response
}

export default {getAllPosts, createPost, setToken, updatePost, deletePost}