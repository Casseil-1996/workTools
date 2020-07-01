import Vue from 'vue'
import { uuid, isType } from '../utils'
const { isError } = isType
let ls = {}
setTimeout(() => {
  let { prototype: { ls: newLS } } = Vue
  ls = newLS
}, 0)

const handlerRes = (data) => {
  return new Promise((resolve, reject) => {
    if (isError(data)) reject({ code: 400, error: data })
    resolve({ data, code: 0 })
  })
}

export default class Request {
  static addTodo (task) {
    const { todo = [] } = ls
    const todoItem = {
      task,
      ts: new Date().valueOf(),
      id: uuid(),
      status: 1
    }
    todo.push(todoItem)
    ls.$set('todo', todo)
    return handlerRes(todoItem)
  }

  static delTodo (todoID) {
    const { todo = [] } = ls
    const idx = todo.findIndex(item => item.id == todoID)
    if (idx != null) todo.slice(idx, 1)
    ls.$set('todo', todo)
    return new handlerRes(true)
  }

  static getTodo (todoID) {
    const { todo = [] } = ls
    return todo.find(item => item.id == todoID)
  }

  static queryTodo (params) {
    console.log(params)
    const { todo = [] } = ls
    return new handlerRes(todo)
  }

  static updateTodo (todoID, todoItem) {
    const { todo = [] } = ls
    todo.some(item => {
      if (item.id == todoID) {
        const { task } = todoItem
        item = { ...item, task }
        return true
      }
    })
    ls.$set('todo', todo)
    return new handlerRes(ls.todo)
  }
}

console.log(Request)