<template>
  <div>
    <div class="actionKit">
      <div class="skykit_btn">
        <i class="el-icon-tickets" @click="openBoard('todo')"></i>
      </div>
      <!-- <div class="skykit_btn">
        <i class="el-icon-refresh" @click="openBoard('')"></i>
      </div>-->
      <div class="skykit_btn">
        <i class="el-icon-data-line" @click="openBoard('countDown')"></i>
      </div>
      <div class="skykit_btn">
        <i class="el-icon-time" @click="openBoard('countDown')"></i>
      </div>
      <div class="skykit_btn" @click="$toggleFullScreen()">
        <i class="el-icon-full-screen" v-if="!status.isFullScreen"></i>
        <i class="el-icon-close" v-else></i>
      </div>
    </div>
    <board :visibility.sync="status.board">
      <stop-watch />
    </board>
  </div>
</template>
<script>
import StopWatch from "./stop-watch";
import board from "./board";
export default {
  components: {
    StopWatch,
    board
  },
  mounted() {
    this.eventID = this.watchScreenStatus(
      () => {
        this.status.isFullScreen = true;
      },
      () => {
        this.status.isFullScreen = false;
      }
    );
  },
  data() {
    return {
      status: {
        isFullScreen: false,
        stopwatch: false,
        board: true
      }
    };
  },
  methods: {
    openBoard(type) {
      console.log(type);
      this.status.board = true;
    }
  },
  beforeDestroy() {
    this.stopWatchScreenStatus(this.eventID);
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