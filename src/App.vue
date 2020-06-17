<template>
  <div id="app" :style="`background-image: url(${bg})`">
    <router-view />
  </div>
</template>

<script>
import bg from '../public/img/star-bg.svg'
export default {
  name: "app",
  data () {
    console.log(bg)
    return { bg }
  },
  components: {}
};
</script>

<style lang="less" scoped>
#app {
  background-size: contain;
  background-position: center;
}
</style>