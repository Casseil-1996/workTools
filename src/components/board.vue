<template>
  <div
    class="border board"
    id="board"
    v-show="visibility"
  >
    <div class="board_title">
      <div
        @click="$emit('update:visibility',false)"
        class="skykit_btn board_title_close"
      >
        <i class="el-icon-close"></i>
      </div>
      <slot name="title" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    visibility: {
      default: false,
      type: Boolean
    }
  }
};
</script>
<style lang="less" scoped>
.board {
  @media (prefers-color-scheme: dark) {
    background-color: #242424;
  }
  transform: translate(-50%, -50%);
  padding: 60px 10px 30px 20px;
  background-color: #fff;
  position: absolute;
  height: 600px;
  width: 300px;
  z-index: 1;
  left: 50%;
  top: 50%;

  &_title {
    text-align: center;
    position: absolute;
    line-height: 60px;
    width: 100%;
    left: 0;
    top: 0;

    &_close {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
