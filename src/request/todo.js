export default class TODO {
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