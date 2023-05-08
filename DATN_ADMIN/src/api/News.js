import axios from 'axios'
export const getNews = (page) => {
  return axios.get('./news', { params: { page } })
}
export const createNew = (data) => {
  return axios.post('./news/', { ...data })
}
export const getNew = (id) => {
  return axios.get(`./news/find/${id}`)
}
export const updateNew = (id, data) => {
  return axios.put(`./news/${id}`, { ...data })
}

export const deleteNew = (id) => {
  return axios.delete(`./news/${id}`)
}
