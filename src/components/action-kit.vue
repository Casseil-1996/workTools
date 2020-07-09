<template>
  <div>
    <div class="actionKit">
      <div class="skykit_btn" @click="openBoard('todo')">
        <i class="el-icon-tickets"></i>
      </div>
      <!-- <div class="skykit_btn"  @click="openBoard('')">
        <i class="el-icon-refresh"></i>
      </div>-->
      <div class="skykit_btn" @click="openBoard('data')">
        <i class="el-icon-data-line"></i>
      </div>
      <div class="skykit_btn" @click="openBoard('countDown')">
        <i class="el-icon-time"></i>
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