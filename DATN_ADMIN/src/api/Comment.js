import axios from 'axios'
export const getComments = (page) => {
  return axios.get('./comment', { params: { page } })
}
export const createComment = (data) => {
  return axios.post('./comment/', { ...data })
}
export const getComment = (id) => {
  return axios.get(`./comment/findComment/${id}`)
}
export const updateComment = (id, data) => {
  return axios.put(`./comment/${id}`, { ...data })
}

export const deleteComment = (id) => {
  return axios.delete(`./comment/${id}`)
}
