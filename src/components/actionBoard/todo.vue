<template>
  <div id="todo">
    <div class="flex todo-list-item">
      <el-input
        class="flex1 mr4"
        size="small"
        v-model="todo"
      ></el-input>
      <sky-btn
        @click="add()"
        icon="el-icon-plus"
        size="small"
      />
    </div>
    <template v-for="item in todoList">
      <div
        :key="item._id"
        class="flex-between todo-list-item"
      >
        <span class="flex1">{{item.task}}</span>
        <div class="flex">
          <sky-btn
            :icon="(item.status & 1 << 2) ? 'el-icon-video-pause' : 'el-icon-video-play'"
            @click="switchAction(item._id)"
            size="small"
          />
          <sky-btn
            @click="del(item._id)"
            icon="el-icon-delete"
            size="small"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      todo: '',
      todoList: [],
    }
  },
  created () {
    const { $request: { todo: $todo } } = this
    this.$todo = $todo
    this.init()
  },
  methods: {
    init () {
      this.todo = ''
      this.getTodoList()
    },
    getTodoList () {
      this.$todo.getList()
        .then(res => {
          console.log(res)
          this.todoList = res.data
        })
    },
    add () {
      if (!this.todo) return
      this.$todo.create(this.todo).then(this.init)
    },
    del (id) {
      this.$todo.del(id).then(res => {
        if (res.code) return
        this.$delete(
          this.todoList,
          this.getTodoIndex(res.data._id),
        )
      })
    },
    getTodoIndex (_id) {
      return this.todoList.findIndex(item => item._id === _id)
    },
    switchAction (id) {
      this.$todo.switchAction(id).then(res => {
        const { data, code } = res
        if (code) return
        const idx = this.getTodoIndex(data._id)
        if (idx >= 0) {
          this.$set(this.todoList, idx, data)
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.todo-list-item {
  height: 44px;
}
</style>
