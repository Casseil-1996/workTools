<template>
  <button
    @click="handleClick"
    :class="['skykit_btn',`skykit_btn_${size}`]"
  >
    <i
      :class="icon"
      v-if="icon"
    ></i>
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    icon: { type: String, default: '' },
    size: { type: String, default: 'default' },
  },
  methods: {
    handleClick (...args) {
      if (this.disabled) return
      this.$emit('click', ...args)
    },
  },
  install (Vue) {
    Vue.component('sky-btn', this)
  },
}
</script>