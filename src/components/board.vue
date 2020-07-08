<template>
  <div id="board" class="border" v-show="visibility">
    <div @click="$emit('update:visibility',false)" class="skykit_btn border_close">
      <i class="el-icon-close"></i>
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
#board,
.border {
  @media (prefers-color-scheme: dark) {
    background-color: #242424;
  }
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: #fff;
  position: absolute;
  height: 600px;
  width: 300px;
  left: 50%;
  top: 50%;

  &_close {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>