<template>
  <div id="TimePicker">
    <div class="sky_scroll" @scroll="handleScroll" ref="sky_scroll_inner">
      <div class="sky_scroll_inner">
        <div></div>
        <div
          v-for="item in 60"
          :class="current == item - 1 ? 'active' : null"
          ref="sky_scroll_item"
          :key="item"
        >{{ item - 1 }}</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    handleScroll () {
      const { scrollTop } = this.$refs.sky_scroll_inner
      const { clientHeight: itemHeight } = this.$refs.sky_scroll_item[0]
      const currentIdx = Math.round(scrollTop / itemHeight)
      clearTimeout(this.timeID)
      this.timeID = setTimeout(() => {
        if (currentIdx === 0) return clearTimeout(this.timeID)
        this.current = currentIdx
        this.$refs.sky_scroll_item[currentIdx - 1]
          .scrollIntoView({
            behavior: "smooth"
          })
        clearTimeout(this.timeID)
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
#TimePicker {
  // scoped style here
  @itemHeight: 30px;

  .sky_scroll {
    overflow: auto;
    height: @itemHeight * 3;
    &::-webkit-scrollbar {
      display: none;
    }
    .sky_scroll_inner {
      & > div {
        font-size: @itemHeight * 0.618;
        line-height: @itemHeight;
        justify-content: center;
        align-items: center;
        height: @itemHeight;
        display: flex;
        color: #9aa0a6;
        &.active {
          color: #eee;
        }
      }
    }
  }
}
</style>