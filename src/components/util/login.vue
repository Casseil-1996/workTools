<template>
  <div>
    <div class="m12">
      <div class="mb8">用户名</div>
      <el-input
        size="small"
        v-model="loginData.name"
      ></el-input>
    </div>
    <div class="m12">
      <div class="mb8">密码</div>
      <el-input
        size="small"
        type="password"
        v-model="loginData.password"
      ></el-input>
    </div>
    <div class="m16 flex">
      <sky-btn
        @click="handleLogin"
        class="flex1"
      >登陆</sky-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      loginData: {},

    }
  },

  methods: {

    handleLogin () {
      this.$store
        .dispatch('login', this.loginData)
        .then(() => {
          this.$emit('login')
        })
    },

  },
};
</script>

<style lang="scss" module>
</style>
