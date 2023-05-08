import axios from 'axios'
export const getUsers = (page) => {
  return axios.get('./user', { params: { page } })
}
export const getUser = (id) => {
  return axios.get(`./user/find/${id}`)
}
export const updateUser = (id, username, email, admin) => {
  return axios.put(`./user/${id}`, {
    username,
    email,
    admin,
  })
}
export const findUser = (phoneNumber, page) => {
  return axios.get('./users/search', {
    params: { phone_number: phoneNumber, page },
  })
}
