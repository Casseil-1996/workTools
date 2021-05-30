<template>
  <div>
    <sky-btn
      @click="handleAdd()"
      class="main-btn"
      icon="ri-add-line"
    >添加新用户</sky-btn>
    <div>
      <div
        :key="item._id"
        class="flex-between user-item border shadow-wide__hover p10 m10"
        v-for="item in userList"
      >
        <div>
          <div class="mb4">{{ item.name }}</div>
          <div class="mb4">{{ item.lastLogin | day }}</div>
        </div>
        <sky-btn
          icon="ri-edit-line"
          class="m0"
          size="small"
        />
      </div>
    </div>
    <boardVue
      :visibility.sync="showUserDialog"
      title="新增用户"
    >
      <div class="flex1">
        <div>
          <span>用户名</span>
          <input
            type="text"
            v-model="currentUser.name"
          />
        </div>
      </div>
      <div>
        <sky-btn class="w100p m0">保存</sky-btn>
      </div>
    </boardVue>
  </div>
</template>

<script>
import boardVue from '../../components/board.vue'

export default {
  name: 'User',
  components: { boardVue },
  data () {
    return {
      userList: [],
      showUserDialog: false,
      currentUser: {},
    }
  },
  created () {
    this.$user = this.$request.user
    this.init()
  },
  methods: {
    init () {
      this.fetchUserList()
    },
    fetchUserList () {
      this.$user.get()
        .then(({ data }) => {
          this.userList = data
        })
    },

    handleAdd () {
      this.showUserDialog = true
    },
  },
};
</script>

<style lang="less" scoped>
.user-item {
  justify-content: space-between;
  align-items: start;
  width: 240px;
}
</style>

