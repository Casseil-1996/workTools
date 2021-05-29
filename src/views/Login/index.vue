<template>
  <div class="flex-center h100p">
    <loginVue @login='$router.back()' class="w250" />
  </div>
</template>

<script>
import loginVue from '../../components/util/login.vue'

export default {
  name: 'Login',
  components: {
    loginVue,
  },
  data () {
    return {

    }
  },

  methods: {

  },
};
</script>

<style lang="scss" module>
</style>
