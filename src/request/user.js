import { axios } from './axios'
const appId = '60a8878fa267e818035fa26e'

export default {
  get (id) {
    return axios.get(`/user/${id}`)
  },

  login (data) {
    return axios.post('/user/login', { ...data, appId })
  },

  del (id) {
    return axios.delete(`/user/${id}`)
  },

  create (data) {
    return axios.post('/user', { ...data, appId })
  },
}
