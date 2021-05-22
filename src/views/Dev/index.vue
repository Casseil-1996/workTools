<template>
  <div id="Dev">
    <input
      type="text"
      v-model="todo"
    />
    <el-button @click="addTodo">提交</el-button>
    <el-card
      :key="item.id"
      v-for="item in todoList"
    >
    <div>任务: {{ item.task }}</div>
    <div>状态: {{ item.status }}</div>
    
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Dev',
  data () {
    return {
      todo: '',
      todoList: [],
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.queryTodo()
      this.todo = ''
    },
    addTodo () {
      this.$request.addTodo(this.todo)
        .then(res => {
          console.log(res)
          this.todo = ''
          this.todoList.push(res.data)
        })
    },
    queryTodo () {
      this.$request.queryTodo().then(res => {
        console.log(res)
        this.todoList = res.data
      })
    },
    delTodo ({ id }) {
      this.$request.delTodo(id).then(res => {
        console.log(res)
        this.init()
      })
    },
  },
}
</script>

<style lang="less" scoped>
#Dev {
}
</style>
