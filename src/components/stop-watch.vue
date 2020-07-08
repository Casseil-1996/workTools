<template>
  <div class="stopwatch">
    <div @click="addTimer" class="skykit_btn">
      <i class="el-icon-plus"></i>
    </div>
    <div :key="item.ts" v-for="item in stopWatchList">
      <div class="flex-between" v-if="item.isExpired">
        <span>已过期</span>
        <div @click="del(item.ts)" class="skykit_btn">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="flex-between" v-else>
        <div>
          <span v-if="item.d">{{item.d}}天</span>
          <span v-if="item.h">{{item.h}}小时</span>
          <span v-if="item.m">{{item.m}}分钟</span>
          <span v-if="item.s">{{item.s}}秒</span>
        </div>
        <div @click="del(item.ts)" class="skykit_btn">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
    <sky-modal>
      <div slot="title"></div>
    </sky-modal>
    <time-picker></time-picker>
  </div>
</template>
<script>
import SkyModal from "./sky-modal";
import TimePicker from "./time-picker";
export default {
  name: "stopwatch",
  components: {
    SkyModal,
    TimePicker
  },
  data() {
    return {
      stopWatchList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.stopWatchData = this.ls.stopWatchList;
      if (this.timeID) return this.getParsedTime();
      this.timeID = setInterval(this.getParsedTime, 1000);
    },
    addTimer() {
      this.commit();
    },
    commit(ts = new Date().valueOf()) {
      const { stopWatchList = [] } = this.ls;
      stopWatchList.push(ts);
      this.ls.$set("stopWatchList", stopWatchList);
      this.init();
    },
    getParsedTime() {
      if (!Array.isArray(this.stopWatchData)) return;
      this.stopWatchList = this.stopWatchData.map(item =>
        this.$utils.getCountdownDetail(item)
      );
    },
    del(ts) {
      const res = this.ls.stopWatchList;
      const idx = res.indexOf(ts);
      res.splice(idx, 1);
      this.ls.$set("stopWatchList", res);
      this.init();
    }
  }
};
</script>
<style lang="less" scoped>
.stopwatch {
}
</style>