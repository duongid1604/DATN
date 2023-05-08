import axios from 'axios'
export const getProducts = (page) => {
  return axios.get('./product', { params: { page } })
}
export const createProduct = (data) => {
  return axios.post('./product/', { ...data })
}
export const getProduct = (id) => {
  return axios.get(`./product/find/${id}`)
}
export const updateProduct = (id, data) => {
  return axios.put(`./product/${id}`, { ...data })
}

export const deleteProduct = (id) => {
  return axios.delete(`./product/${id}`)
}
