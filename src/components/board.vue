<template>
  <div
    class="border board"
    id="board"
    v-show="visibility"
  >
    <div class="board_title plain border_b">
      <div class="board_title_close">
        <sky-btn
          @click="$emit('update:visibility',false)"
          icon="el-icon-close"
          size="middle"
        ></sky-btn>
      </div>
      <slot name="title">{{title}}</slot>
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
      type: Boolean,
    },

    title: {
      default: '',
      type: String,
    },
  },
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
    @media (prefers-color-scheme: dark) {
      color: #eee;
    }

    justify-content: center;
    align-items: center;
    position: relative;
    color: #242424;
    display: flex;
    height: 60px;
    width: 100%;
    left: 0;
    top: 0;

    &_close {
      transform: translate(0, -50%);
      position: absolute;
      right: 0;
      top: 50%;
    }
  }

  &_body {
    flex-direction: column;
    overflow: auto;
    display: flex;
    padding: 12px;
    flex: 1;
  }
}
</style>
