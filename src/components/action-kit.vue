<template>
  <div>
    <div class="actionKit">
      <sky-btn
        :class="{ ml50: idx === actionList.length - 1 }"
        :icon="`ri-${item.icon}-line`"
        :key="idx"
        @click="item.actionFn"
        v-for="(item, idx) in actionList"
      />
    </div>
    <board
      :title="title"
      :visibility.sync="status.board"
    >
      <components :is="status.boardType" />
    </board>
  </div>
</template>
<script>
import * as actionBoard from './actionBoard'
import board from './board'

export default {
  components: {
    ...actionBoard,
    board,
  },
  mounted () {
    this.eventID = this.watchScreenStatus(
      () => {
        this.status.isFullScreen = true
      },
      () => {
        this.status.isFullScreen = false
      },
    )
  },
  data () {
    return {
      status: {
        isFullScreen: false,
        stopwatch: false,
        board: false,
        boardType: null,
      },
    }
  },

  computed: {
    actionList () {
      return [{
        actionFn: () => { this.openBoard('todo') },
        icon: 'task',
      }, {
        actionFn: () => { this.openBoard('countDown') },
        icon: 'timer',
      }, {
        actionFn: () => { this.$router.push('/dashboard') },
        icon: 'calendar-check',
      }, {
        actionFn: () => { this.$router.push('/user') },
        icon: 'contacts',
      }, {
        actionFn: () => { this.$toggleFullScreen() },
        icon: this.status.isFullScreen ? 'fullscreen-exit' : 'fullscreen',
      }, {
        actionFn: () => { this.openBoard('user') },
        icon: this.isLogin ? 'user-3' : 'login-box',
      }]
    },

    isLogin () {
      return this.$store.state.isLogin
    },

    userInfo () {
      return this.$store.state.userInfo
    },

    title () {
      switch (this.status.boardType) {
        case 'countDown':
          return '计时器'
        case 'todo':
          return '待办事项'
        case 'user':
          return this.isLogin ? this.userInfo.name : '登陆'


        default:
          return ''
      }
    },


  },

  methods: {
    openBoard (type) {
      this.status.board = true
      this.status.boardType = type
    },
  },
  beforeDestroy () {
    this.stopWatchScreenStatus(this.eventID)
  },
};
</script>
<style lang="less" scoped>
.actionKit {
  position: absolute;
  display: flex;
  right: 20px;
  top: 20px;

  & > div {
    position: relative;
  }
}
</style>
