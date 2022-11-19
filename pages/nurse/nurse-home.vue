<template>
  <u-tabbar :value="active" @change="name => active = name" :fixed="true" :placeholder="true"
    :safeAreaInsetBottom="true">
    <u-tabbar-item text="首页" icon="home" name="home"></u-tabbar-item>
    <u-tabbar-item text="患者" icon="photo" name="search"></u-tabbar-item>
    <u-tabbar-item text="我的" icon="account" name="profile"></u-tabbar-item>
  </u-tabbar>
</template>

<script>
  export default {
    data() {
      return {
        active: "search"
      }
    },
    onLoad() {

    },
    methods: {}
  }
</script>

<style>
</style>
