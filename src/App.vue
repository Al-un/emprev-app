<template>
  <layout-default id="app">
    <router-view></router-view>
  </layout-default>
</template>

<script>
import LayoutDefault from '@/layouts/Default.vue'

export default {
  name: 'App',
  components: { LayoutDefault },
}
</script>
