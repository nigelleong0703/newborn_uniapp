<template>
  <view class="content">
    <view class="body">
      <view class="text-area">
        <text class="title">{{title}}</text>
      </view>
      <view class="login-form">
        <view class="form-element">
          <u--input placeholder="请输入用户信息" border="surround" v-model="username" clearable>
          </u--input>
        </view>
        <view class="form-element">
          <u--input placeholder="请输入邮箱" border="surround" v-model="email" clearable></u--input>
        </view>
        <view class="form-element">
          <u-button class='button' type='default' size="large" color='orange' @click="checkogin" text="提交">
          </u-button>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: "请输入用户信息"
      }
    },
    onLoad() {

    },
    methods: {
      checkLogin() {
        uni.request({
          url: "",
          method: 'GET',
          date: {
            username: this.username,
            password: this.password
          },
          success: res => {
            console.log(res.data);
          },
          fail: () => {},
          complete: () => {}
        })
      },
      navLogin() {
        uni.navigateTo({
          url: "pages/contact-admin/contact-admin",
        })
      }
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

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 50rpx;
    font-weight: bold;
    color: #ffaa00;
    margin-top: 200rpx;
    margin-bottom: 50rpx;
  }

  .body {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .login-form {
    justify-content: flex-start;
    padding-left: 15vw;
    padding-right: 15vw;
    font-weight: bold;
  }

  .form-element {
    margin-top: 30px;
  }
</style>
