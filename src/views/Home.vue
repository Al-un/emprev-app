<template>
  <layout-default>
    <router-view></router-view>
  </layout-default>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import LayoutDefault from "@/layouts/Default.vue";

export default {
  name: "Home",
  components: { LayoutDefault }
};
</script>
