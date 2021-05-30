import { axios } from './axios'
import { appId } from '../../config'

export default {
  get () {
    return axios.get('/user')
  },
  getById (id) {
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
