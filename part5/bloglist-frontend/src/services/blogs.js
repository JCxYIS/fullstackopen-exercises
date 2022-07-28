import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog, token) => {
  const response = axios.post(baseUrl, blog, {headers: { Authorization: `Bearer ${token}` }})
  return response
}

export default { getAll, create }