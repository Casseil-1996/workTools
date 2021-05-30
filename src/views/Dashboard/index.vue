<template>
  <div class="flex h100p">
    <sky-btn
      @click="handleAdd()"
      class="main-btn"
      icon="ri-add-line"
    >添加新清单</sky-btn>
    <template v-for="board in dashboardList">
      <div
        :key="board._id"
        class="dashboard-card bg-auto border m20 border"
      >
        <div
          class="flex-between flex-center h35 px10 mt10 dashboard-card-title"
        >
          <div class="flex-center">
            <span class="fw700 mr16">{{ board.detail }}</span>
            <span class="skykit-tag">{{ board.children.length }}</span>
          </div>
          <div class="btn-add-detail">
            <sky-btn
              :border="false"
              @click="handleAdd(board._id)"
              icon="ri-add-line"
              size="small"
            />
            <sky-btn
              :border="false"
              @click="handleDel(board._id)"
              class="bg-auto"
              icon="ri-delete-bin-line"
              size="small"
            ></sky-btn>
          </div>
        </div>
        <div class="auto-scroll flex-col flex1 align-stretch px10">
          <template v-for="dash in board.children">
            <div
              :key="dash._id"
              class="dashboard-item shadow-wide__hover bg-auto border"
            >
              <div class="flex-between">
                <div>{{ dash.detail }}</div>
                <sky-btn
                  :border="false"
                  @click="handleDel(dash._id)"
                  class="bg-auto"
                  icon="ri-delete-bin-line"
                  size="small"
                ></sky-btn>
              </div>
              <div>{{ dash.createUser.name }}</div>
            </div>
          </template>
          <sky-btn
            @click="handleAdd(board._id)"
            class="mx0"
          >添加任务</sky-btn>
        </div>
      </div>
    </template>

    <boardVue
      :visibility.sync="showAddBoard"
      title="新增看板"
    >
      <div class="flex-col align-stretch h100p">
        <div class="flex1 mt20">
          <input
            @keyup.enter="handleSave"
            class="w100p"
            type="text"
            v-model="currentData.detail"
          />
        </div>
        <sky-btn
          @click="handleSave"
          class="align-stretch"
        >保存</sky-btn>
      </div>
    </boardVue>
  </div>
</template>

<script>
import boardVue from '../../components/board.vue'

export default {
  name: 'Dashboard',

  components: {
    boardVue,
  },

  data () {
    return {
      dashboardList: [],
      showAddBoard: false,
      currentData: {
        parentId: undefined,
        detail: '',
      },
    }
  },

  created () {
    const { $request: { dashboard } } = this
    this.$dashboard = dashboard

    this.init()
  },

  watch: {
    showAddBoard (newVal) {
      if (newVal) return

      this.currentData = { parentId: undefined, detail: '' }
    },
  },

  methods: {
    init () {
      this.showAddBoard = false
      this.fetchDashboardList()
    },

    fetchDashboardList () {
      this.$dashboard.get()
        .then(({ data }) => {
          this.dashboardList = data
        })
        .catch((err) => {

          console.error(err)
        })
    },

    createDashboard () {
      this.$dashboard.create(this.data)
    },

    handleAdd (parentId) {
      this.showAddBoard = true
      this.currentData.parentId = parentId
    },

    handleDel (id) {
      this.$dashboard.del(id).then(() => { this.init() })
    },

    handleSave () {
      this.$dashboard.create(this.currentData)
        .then(() => { this.init() })
    },
  },
};
</script>

<style lang="less" scope>

.dashboard {
  &-card {
    flex-direction: column;
    align-self: stretch;
    display: flex;
    width: 300px;

    &-title {
      .btn-add-detail {
        display: none;
      }

      &:hover {
        .btn-add-detail {
          display: block;
        }
      }
    }
  }

  &-item {
    padding: 10px;
    min-height: 80px;
    margin: 8px 0;
  }
}
</style>

