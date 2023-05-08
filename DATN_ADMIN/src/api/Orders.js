import axios from 'axios'
export const getOrders = (page) => {
  return axios.get('./order', { params: { page } })
}
export const createOrder = (data) => {
  return axios.post('./order/', { ...data })
}
export const getOrder = (id) => {
  return axios.get(`./order/find/${id}`)
}
export const updateOrder = (id, data) => {
  return axios.put(`./order/${id}`, { ...data })
}
export const getInCome = () => {
  return axios.get('./order/income/')
}
export const deleteOrder = (id) => {
  return axios.delete(`./order/${id}`)
}
