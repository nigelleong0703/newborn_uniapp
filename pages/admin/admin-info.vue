<template>
  <view class="body">
    <view class="tab-bar-line"></view>
    <view class='content'>
      <view>
        <view>用户名：</view>
        <view>{{admin_info.name}}</view>
        <view>名字：</view>
        <view>{{admin_info.username}}</view>
        <view>部门：</view>
        <view>{{admin_info.department}}</view>

        <view>管理员操作</view>
        <u-button class="button" type="error" shape="circle" @click="viewAdmin" text="管理员"></u-button>

        <view>科室操作</view>
        <u-button class="button" type="error" shape="circle" @click="viewDepartment" text="科室"></u-button>

        <view>管理员</view>
        <u-button class="button" type="error" shape="circle" @click="logout" text="登出"></u-button>
      </view>
    </view>
    <tabBar-admin :currentPage="3"></tabBar-admin>
  </view>
</template>

<script>
  import common from "common/js/common.js"
  let windowWidth = 0,
    scrollTimer = false,
    tabBar;
  export default {
    data() {
      return {
        admin_info: {},
      }
    },
    onReady() {

    },

    onLoad() {
      let that = this
      that.admin_info = uni.getStorageSync('current_user')
      console.log(that.admin_info)

    },

    methods: {
      logout() {
        uni.showModal({
          content: '是否要退出登录',
          success: (res) => {
            if (res.confirm) {
              uni.setStorageSync('login_status', false)
              uni.clearStorage()
              let res = uni.getStorageInfoSync()
              console.log(res)
              uni.showToast({
                title: "退出登录成功",
                icon: 'none'
              })
              uni.reLaunch({
                url: '/pages/index/index'
              })

            }
          }
        })
      },
      viewAdmin() {
        uni.navigateTo({
          url: '/pages/admin/admin-view'
        })
      },
      viewDepartment() {
        uni.navigateTo({
          url: '/pages/department/department-view'
        })
      },
    },
  }
</script>

<style lang='scss'>
  .body {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    color: #6B8082;
    position: relative;
    background-color: #f6f6f6;
  }

  .button {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;

  }
</style>
