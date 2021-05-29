<template>
  <div>
    <div class="actionKit">
      <sky-btn
        :key="idx"
        @click="item.actionFn"
        v-for="(item, idx) in actionList"
      >
        <i :class="item.icon"></i>
      </sky-btn>
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
        icon: 'ri-task-line',
      }, {
        actionFn: () => { this.openBoard('countDown') },
        icon: 'ri-timer-line',
      }, {
        actionFn: () => { this.$router.push('/dashboard') },
        icon: 'ri-calendar-check-line',
      }, {
        actionFn: () => { this.$toggleFullScreen() },
        icon: `ri-fullscreen${this.status.isFullScreen && '-exit' || ''}-line`,
      }, {
        actionFn: () => { this.openBoard('user') },
        icon: 'ri-shield-user-line',
      },
      ]
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
