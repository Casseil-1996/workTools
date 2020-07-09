<template>
  <div
    class="border board"
    id="board"
    v-show="visibility"
  >
    <div class="board_title plain border_b">
      <sky-btn
        @click="$emit('update:visibility',false)"
        icon="el-icon-close"
        class="board_title_close"
      >
      </sky-btn>
      <slot name="title" />
    </div>
    <div class="board_body">
      <slot />
    </div>
    <div class="board_foot">
      <slot name="foot" />
    </div>
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
  background-color: #fff;
  flex-direction: column;
  position: absolute;
  height: 600px;
  display: flex;
  width: 300px;
  z-index: 1;
  left: 50%;
  top: 50%;

  &_title {
    padding-bottom: 4px;
    text-align: center;
    position: relative;
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

  &_body {
    padding: 12px 24px 24px;
    overflow: auto;
    flex: 1;
  }
}
</style>
