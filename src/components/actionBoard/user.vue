<template>
  <div id="user">
    <loginVue v-if="!isLogin" />
    <template v-else>
      <div class="tac p24">
        <img
          :src="userInfo.avatar"
          class="circle"
          style="width: 48px; height: 48px;"
          v-if="userInfo.avatar"
        />
        <i
          class="ri-emotion-laugh-fill"
          style="font-size: 48px;"
          v-else
        />
      </div>
      <div class="user-item">
        <span>用户名:</span>
        <span>{{ userInfo.name }}</span>
      </div>
      <div class="user-item">
        <span>积分:</span>
        <span>{{ userInfo.point }}</span>
      </div>
      <div class="user-item">
        <span>生日:</span>
        <span>{{ userInfo.birthday | day }}</span>
      </div>
      <div class="user-item">
        <span>性别:</span>
        <span>{{ userInfo.gender }}</span>
      </div>
      <div class="user-item">
        <span>上次登录:</span>
        <span>{{ userInfo.lastLogin | day }}</span>
      </div>
      <div class="m16 flex">
        <sky-btn
          @click="handleLogout"
          class="danger flex1"
        >退出登陆</sky-btn>
      </div>
    </template>
  </div>
</template>
<script>
import loginVue from '../util/login.vue'


export default {

  name: 'User',

  data () {
    return {
      rules: {},
    }
  },

  components: {
    loginVue,
  },
  created () {
    this.init()
  },

  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    },
  },

  methods: {
    init () {
    },

    handleLogout () {
      this.$store.commit('logout')
    },
  },
}
</script>

<style lang="less" scoped>
.user-item {
  margin: 12px 0;
  display: flex;

  & > span:first-child {
    margin-right: 12px;
    text-align: right;
    min-width: 6em;
  }
}
</style>
