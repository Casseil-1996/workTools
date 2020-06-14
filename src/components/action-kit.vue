<template>
  <div>
    <div class="actionKit">
      <div class="skykit_btn">
        <i class="el-icon-tickets"></i>
      </div>
      <div class="skykit_btn">
        <i class="el-icon-refresh"></i>
      </div>
      <div class="skykit_btn">
        <i class="el-icon-data-line"></i>
      </div>
      <div class="skykit_btn">
        <i class="el-icon-time" @click="handleClickClock"></i>
      </div>
      <div class="skykit_btn" @click="$toggleFullScreen()">
        <i class="el-icon-full-screen" v-if="!status.isFullScreen"></i>
        <i class="el-icon-close" v-else></i>
      </div>
    </div>
    <stop-watch />
  </div>
</template>
<script>
import StopWatch from './stop-watch'
export default {
  components: {
    StopWatch
  },
  mounted() {
    this.eventID = this.watchScreenStatus(
      () => {
        this.status.isFullScreen = true
      },
      () => {
        this.status.isFullScreen = false
      }
    )
  },
  data() {
    return {
      status: {
        isFullScreen: false,
        stopwatch: false
      }
    }
  },
  methods: {
    handleClickClock() {
      let status = this.status.stopwatch
      this.status.stopwatch = !status
    }
  },
  beforeDestroy() {
    this.stopWatchScreenStatus(this.eventID)
  }
}
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