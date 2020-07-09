<template>
  <div id="todo">
    <div class="flex">
      <el-input
        class="flex1"
        v-model="todo"
      ></el-input>
      <sky-btn
        @click="add()"
        size='middle'
        icon='el-icon-plus'
      />
    </div>
    <template v-for="item in todoList">
      <div
        :key="item._id"
        class="flex-between"
      >
        <span>{{item.task}}</span>
        <sky-btn
          size='small'
          @click="switchAction"
          :icon="item.isActive?'el-icon-video-play':'el-icon-video-play'"
        />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      todo: '',
      todoList: []
    }
  },
  created () {
    const { $request: { todo: $todo } } = this
    this.$todo = $todo
    this.init()
  },
  methods: {
    init () {
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
      this.$todo.create(this.todo).then(this.init())
    },
    switchAction () {
      console.log()
    }
  }
}
</script>
<style lang="less" scoped>
#todo {
}
</style>