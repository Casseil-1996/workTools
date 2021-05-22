<template>
  <div class="home">
    <div class="action-container">
      <action-kit />
    </div>
    <div class="time-container pure-text">
      <div class="date">
        <span>{{date.YYYY}} 年</span>
        <span> {{date.MM}} 月</span>
        <span> {{date.DD}} 日</span>
      </div>
      <div class="time mb20vm">
        <span>{{date.HH}}:</span>
        <span>{{date.mm}}:</span>
        <span>{{date.ss}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import actionKit from '@/components/action-kit'
export default {
  name: 'Home',
  components: {
    actionKit,
  },
  created() {
    this.getDateAndTime()
    this.init()
  },
  data() {
    return {
      date: '',
      time: '',
    }
  },
  methods: {
    init() {
      if (this.timeID) clearInterval(this.timeID)
      this.timeID = setInterval(this.getDateAndTime, 1000)
    },
    getDateAndTime() {
      this.date = this.$utils.getTimeDetail()
    },
  },
  beforeDestroy() {
    clearInterval(this.timeID)
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .time-container {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    height: 100%;
    width: 100%;
    text-align: center;
    * {
      width: 100%;
    }
    .date {
      font-size: 46px;
    }
    .time {
      font-size: 96px;
    }
  }
}
</style>
