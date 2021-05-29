<template>
  <div
    :style="`background-image: url(${bg})`"
    id="app"
  >
    <router-view />
  </div>
</template>

<script>
import bg from '../public/img/star-bg.svg'
export default {
  name: 'app',

  data () {
    return { bg }
  },

  components: {},

  created () {
    this.$store.commit('init')
  },
};
</script>

<style lang="less" scoped>
#app {
  background-size: contain;
  background-position: center;
}
</style>
