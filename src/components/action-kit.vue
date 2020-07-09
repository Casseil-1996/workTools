<template>
  <div>
    <div class="actionKit">
      <div class="skykit_btn">
        <i
          @click="openBoard('todo')"
          class="el-icon-tickets"
        ></i>
      </div>
      <!-- <div class="skykit_btn"  @click="openBoard('')">
        <i class="el-icon-refresh"></i>
      </div>-->
      <div class="skykit_btn">
        <i
          @click="openBoard('countDown')"
          class="el-icon-data-line"
        ></i>
      </div>
      <div class="skykit_btn">
        <i
          @click="openBoard('countDown')"
          class="el-icon-time"
        ></i>
      </div>
      <div
        @click="$toggleFullScreen()"
        class="skykit_btn"
      >
        <i
          class="el-icon-full-screen"
          v-if="!status.isFullScreen"
        ></i>
        <i
          class="el-icon-close"
          v-else
        ></i>
      </div>
    </div>
    <board :visibility.sync="status.board">
      <template #title>{{ titleMap[status.boardType] }}</template>
      <count-down v-if="status.boardType==='countDown'" />
    </board>
  </div>
</template>
<script>
import countDown from "./countDown"
import board from "./board"
export default {
  components: {
    countDown,
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
      titleMap:{
        countDown:'计时器'
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
