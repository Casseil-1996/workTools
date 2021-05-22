<template>
  <div class="stopwatch">
    <div
      :key="item.ts"
      v-for="item in stopWatchList"
    >
      <div
        class="flex-between"
        v-if="item.isExpired"
      >
        <span>已过期</span>
        <sky-btn
          @click="del(item.ts)"
          icon="el-icon-close"
        >
        </sky-btn>
      </div>
      <div
        class="flex-between"
        v-else
      >
        <div>
          <span v-if="item.d">{{item.d}}天</span>
          <span v-if="item.h">{{item.h}}小时</span>
          <span v-if="item.m">{{item.m}}'' </span>
          <span v-if="item.s">{{item.s}}'</span>
        </div>
        <sky-btn
          @click="del(item.ts)"
          icon="el-icon-close"
        >
        </sky-btn>
      </div>
    </div>
    <time-picker v-model="min" />
    <sky-btn
      @click="addTimer"
      icon="el-icon-plus"
    >
    </sky-btn>
    <sky-modal>
      <div slot="title"></div>
    </sky-modal>
  </div>
</template>
<script>
import SkyModal from '../sky-modal'
import TimePicker from '../time-picker'
export default {
  name: 'stopwatch',
  components: {
    SkyModal,
    TimePicker,
  },
  data () {
    return {
      stopWatchList: [],
      min: 0,
    }
  },
  computed: {
    ts () {
      return this.min * 1000 * 60
    },
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.min = 0
      this.stopWatchData = this.ls.stopWatchList
      if (this.timeID) return this.getParsedTime()
      this.timeID = setInterval(this.getParsedTime, 1000)

    },
    addTimer () {
      this.commit()
    },
    commit () {
      const { stopWatchList = [] } = this.ls
      stopWatchList.push(this.ts + new Date().valueOf())
      this.ls.$set('stopWatchList', stopWatchList)
      this.init()
    },
    getParsedTime () {
      if (!Array.isArray(this.stopWatchData)) return
      this.stopWatchList = this.stopWatchData.map(item =>
        this.$utils.getCountdownDetail(item),
      )
    },
    del (ts) {
      const res = this.ls.stopWatchList
      const idx = res.indexOf(ts)
      res.splice(idx, 1)
      this.ls.$set('stopWatchList', res)
      this.init()
    },
  },
};
</script>
<style lang="less" scoped>
.stopwatch {
}
</style>
