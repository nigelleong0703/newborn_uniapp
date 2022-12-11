<template name="tabBar_admin">
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
    name: 'tabBar_admin',
    data() {
      return {
        current: 0,
        list: [{
            iconPath: "/static/tabBar/nurse.png",
            selectedIconPath: "/static/tabBar/nurse_selected.png",
            text: '护士',
            customIcon: false,
            "pagePath": "pages/admin/admin-nurse"
          },
          {
            iconPath: "/static/tabBar/doctor.png",
            selectedIconPath: "/static/tabBar/doctor_selected.png",
            text: '医生',
            customIcon: false,
            "pagePath": "pages/admin/admin-doctor"
          },
          {
            iconPath: "/static/tabBar/patient.png",
            selectedIconPath: "/static/tabBar/patient_selected.png",
            text: '患者',
            customIcon: false,
            "pagePath": "pages/admin/admin-patient"
          },
          {
            iconPath: "/static/tabBar/info.png",
            selectedIconPath: "/static/tabBar/info_selected.png",
            text: '我的',
            customIcon: false,
            "pagePath": "pages/admin/admin-info"
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
    width: 40rpx;
    height: 40rpx;
  }
</style>
