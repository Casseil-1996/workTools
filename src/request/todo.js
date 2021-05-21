import { axios } from './axios'
export default {
  getList (params = {}) {
    return axios.get('/todo', { params })
  },
  get (id) {
    return axios.get(`/todo/${id}`)
  },
  del (id) {
    return axios.delete(`/todo/${id}`)
  },
  switchAction (id) {
    return axios.put(`/todo/switchAction/${id}`)
  },
  create (task) {
    return axios.post('/todo', {
      task
    })
  }
}
