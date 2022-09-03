import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog/*, token*/) => {
  const response = await axios.post(baseUrl, blog, 
    //{headers: { Authorization: `Bearer ${token}` }}  // we use cookie to store token :)
  )
  return response.data
}

const remove = async (blogId) => {
  return await axios.delete(`${baseUrl}/${blogId}`);
}

const like = async (blogId) => {
  return await axios.post(`${baseUrl}/${blogId}/like`);
}

export default { getAll, create, remove, like }