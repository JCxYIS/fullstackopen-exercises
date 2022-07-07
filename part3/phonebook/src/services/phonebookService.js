import axios from "axios";

// const BASE_URL = 'http://localhost:3001/api/persons'
const BASE_URL = 'https://fullstack-exercise-phonebookbe.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(BASE_URL, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = (id) => {
    const request = axios.delete(`${BASE_URL}/${id}`)
    return request.then(response => response.data)
  }

export default { getAll, create, update, deleteObj }