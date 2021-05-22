<template>
  <div id="Sky-Modal">
    <div>
      <template v-for="item in slotArr">
        <slot :name="item"></slot>
      </template>
      <title>{{ title }}</title>
      <!-- <template v-for="item in ele">{{ item }}</template> -->
      <div class="sky_btn">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Sky-Modal',
  props: {
    title: {
      defult: false,
      type: String,
    },
  },


  computed: {
    slotArr () {
      return Object.keys(this.$slots)
    },
  },
  data () {
    return {
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
#Sky-Modal {
}
</style>