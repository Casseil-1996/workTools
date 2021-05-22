import Axios from 'axios'
const axios = Axios.create({
  baseURL: '/v1',
})
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export const delToken = () => {
  axios.defaults.headers.common['Authorization'] = ''
}

export const setToken = (token) => {
  if (!token) return delToken()
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export { axios }
