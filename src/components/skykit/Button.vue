<template>
  <button
    :class="['skykit-btn',`skykit-btn__${size}`, { border }]"
    @click="handleClick"
  >
    <i
      :class="icon"
      v-if="icon"
    ></i>
    <span>
      <slot />
    </span>
  </button>
</template>
<script>
export default {
  props: {
    icon: { type: String, default: '' },
    size: { type: String, default: 'default' },
    border: { type: Boolean, default: true },
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
