import axios from 'axios'
const base = './auth/'
export const login = (username, pass) => {
  return axios.post(base + 'login', { username: username, password: pass })
}
export const logout = () => {
  return axios.post(base + 'logout')
}
