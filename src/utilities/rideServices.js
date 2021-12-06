import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/rides'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (obj) => {
  return axios.post(baseUrl, obj)
}

const update = (id, obj) => {
  return axios.put(`${baseUrl}/${id}`, obj)
}

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const obj = { getAll, create, update, destroy }

export default obj