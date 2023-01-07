<template name="tabBar_info">
  <u-tabbar v-model="current" :list="list" :mid-button="false" @change="changeTab" :safeAreaInsetBottom="true"
    :fixed="true" :placeholder="true" activeColor="#ffaa00">
    <u-tabbar-item v-for="(item, index) in list" :key="index" :text="item.text" @click="click1">
      <image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath"></image>
      <image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath"></image>
    </u-tabbar-item>
  </u-tabbar>
</template>


<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        default: 0
      }
    },
    name: 'tabBar_info',
    data() {
      return {
        current: 0,
        list: [{
            iconPath: "/static/tabBar-nurse/home.png",
            selectedIconPath: "/static/tabBar-nurse/home_selected.png",
            text: '首页',
            customIcon: false,
            "pagePath": "pages/nurse/nurse-patient_list"
          },
          {
            iconPath: "/static/tabBar-nurse/about.png",
            selectedIconPath: "/static/tabBar-nurse/about_selected.png",
            text: '我的',
            customIcon: false,
            "pagePath": "pages/nurse/nurse-info"
          }
        ],
      }
    },
    mounted() {
      this.current = this.currentPage;
      uni.hideTabBar();
    },
    methods: {
      changeTab(e) {
        uni.redirectTo({
          url: '/' + this.list[e].pagePath,
        })
      },
      click1(e) {
        this.changeTab(e)
      }
    }
  }
</script>

<style>
  .u-page__item__slot-icon {
    width: 50rpx;
    height: 50rpx;
    padding: 6rpx;
  }
</style>
