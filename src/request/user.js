import { axios } from './axios'
export default {
  get (id) {
    return axios.get(`/user/${id}`)
  },
  login (data) {
    return axios.get(`/user/`, data)
  },
  del (id) {
    return axios.delete(`/user/${id}`)
  },
  create (data) {
    return axios.post('/user', data)
  }
}
