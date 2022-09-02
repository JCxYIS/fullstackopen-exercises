import axios from 'axios'
const baseUrl = ''
const loginUrl = baseUrl + '/api/users/login'
const getUserUrl = baseUrl + '/api/users'


const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
//   console.log(response)
  return response.data.data
}

const getUser = async token => {
    const response = await axios.get(getUserUrl, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

export default { login, getUser }