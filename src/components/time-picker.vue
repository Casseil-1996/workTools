<template>
  <div id="TimePicker">
    <div
      @scroll="handleScroll"
      class="sky_scroll"
      ref="sky_scroll_inner"
    >
      <div class="sky_scroll_inner">
        <div
          :class="{point: true, active: currentIdx == item - 2 }"
          :key="item"
          @click="$emit('change',item-2)"
          ref="sky_scroll_item"
          v-for="(item) in 62"
        >{{ (item == 1 || item == 62) ? '' : item - 2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: { prop: 'currentIdx', event: 'change' },
  name: 'TimePicker',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentIdx: {
      type: Number,
      default: 0,
    }
  },
  watch: {
    currentIdx (newVal) {
      this.$refs.sky_scroll_item[newVal]
        .scrollIntoView({
          behavior: "smooth"
        })
    }
  },
  methods: {
    handleScroll () {
      const { scrollTop } = this.$refs.sky_scroll_inner
      const { clientHeight: itemHeight } = this.$refs.sky_scroll_item[0]
      const currentIdx = Math.round(scrollTop / itemHeight)
      clearTimeout(this.timeID)
      this.timeID = setTimeout(() => {
        this.$emit('change', currentIdx)
        if (currentIdx === 0) return clearTimeout(this.timeID)
        this.$refs.sky_scroll_item[currentIdx]
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
