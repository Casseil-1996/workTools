import { axios } from './axios'
export default {
  get () {
    return axios.get('/dashboard')
  },

  del (id) {
    return axios.delete(`/dashboard/${id}`)
  },

  create (data) {
    return axios.post('/dashboard', data)
  },
}
