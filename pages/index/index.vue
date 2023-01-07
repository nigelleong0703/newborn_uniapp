<template>
  <view class="content" :style="{height: scrollerHeight}">
    <view class="header">
      <image mode="aspectFit" src="/static/logo.jpg"></image>
    </view>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="btn-area">
      <u-button class='button' shape='circle' type='default' size="large" color='orange' @click="navigateAdmin"
        text="管理员 Admin">
      </u-button>
      <u-button class='button' shape='circle' type='default' size='large' color='orange' @click="navigateNurse"
        text="护士 Nurse">
      </u-button>
    </view>
  </view>
  </view>
</template>


<script>
  export default {
    data() {
      return {
        title: "欢迎来到NewBorn系统"
      }
    },
    computed: {
      scrollerHeight: function() {
        console.log(uni.getSystemInfoSync())
        console.log(uni.getSystemInfoSync().windowHeight - 50)
        return (uni.getSystemInfoSync().windowHeight - 50).toString() + 'px';
      },
    },
    onLoad() {
      this.$request.get('/api/list/department').then(res => {
        console.log(res)
        uni.setStorageSync('department_list', res.data)
      })
    },
    methods: {
      navigateAdmin() {
        uni.navigateTo({
          url: '/pages/admin/admin-login'
        })
      },
      navigateNurse() {
        uni.navigateTo({
          url: '/pages/nurse/nurse-login'
        })
      },

    }
  }
</script>

<style>
  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .header {
    height: 30vh;
    display: flex;
    justify-content: center;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 50rpx;
    font-weight: bold;
    color: #ffaa00;
  }

  .btn-area {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 15vw;
    padding-right: 15vw;
    font-weight: bold;
  }
</style>
