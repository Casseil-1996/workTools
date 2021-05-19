<template>
  <div>
    <div class="actionKit">
      <sky-btn>
        <i
          @click="openBoard('todo')"
          class="el-icon-tickets"
        ></i>
      </sky-btn>
      <!-- <sky-btn  @click="openBoard('')">
        <i class="el-icon-refresh"></i>
      </sky-btn>-->
      <sky-btn>
        <i
          @click="openBoard('countDown')"
          class="el-icon-data-line"
        ></i>
      </sky-btn>
      <sky-btn>
        <i
          @click="openBoard('countDown')"
          class="el-icon-time"
        ></i>
      </sky-btn>
      <sky-btn @click="$toggleFullScreen()">
        <i
          class="el-icon-full-screen"
          v-if="!status.isFullScreen"
        ></i>
        <i
          class="el-icon-close"
          v-else
        ></i>
      </sky-btn>
    </div>
    <board :visibility.sync="status.board">
      <template #title>{{ titleMap[status.boardType] }}</template>
      <count-down v-if="status.boardType==='countDown'" />
      <todo v-if="status.boardType==='todo'" />
    </board>
  </div>
</template>
<script>
import countDown from "./countDown"
import todo from "./todo"
import board from "./board"
export default {
  components: {
    countDown,
    todo,
    board
  },
  mounted () {
    this.eventID = this.watchScreenStatus(
      () => {
        this.status.isFullScreen = true
      },
      () => {
        this.status.isFullScreen = false
      }
    )
  },
  data () {
    return {
      status: {
        isFullScreen: false,
        stopwatch: false,
        board: false,
        boardType: null
      },
      titleMap: {
        countDown: '计时器',
        todo: '待办事项'
      }
    }
  },
  methods: {
    openBoard (type) {
      console.log(type)
      this.status.board = true
      this.status.boardType = type
    }
  },
  beforeDestroy () {
    this.stopWatchScreenStatus(this.eventID)
  }
};
</script>
<style lang="less" scoped>
.actionKit {
  position: absolute;
  display: flex;
  right: 20px;
  top: 20px;

  & > div {
    position: relative;
  }
}
</style>
