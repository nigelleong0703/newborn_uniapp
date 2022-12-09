<template>
  <view class="content">
    <view class="header">
      <image mode="aspectFit" src="/static/logo.jpg"></image>
    </view>
    <view class="body">
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
      <view class="login-form">
        <u--form ref="form" :model="form" :rules="rules">
          <u-form-item prop="username" ref="item1">
            <u--input placeholder="输入用户名" border="surround" v-model="form.username" clearable>
            </u--input>
          </u-form-item>
          <u-form-item prop="password" ref="item2">
            <u--input placeholder="输入密码" border="surround" v-model="form.password" password clearable>
            </u--input>
          </u-form-item>
          <view class="form-element">
            <u-button class='button' type='default' size="large" color='orange' @click="login" text="登录">
            </u-button>
          </view>
        </u--form>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: "欢迎管理员",
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: {
            rules: [{
              required: true,
              errorMessage: '请输入用户名'
            }],
            validateTrigger: 'submit'
          },
          password: {
            rules: [{
              required: true,
              errorMessage: '请输入密码'
            }],
            validateTrigger: 'submit'
          },
        }
      }
    },
    onLoad() {

    },
    methods: {
      login() {
        this.$refs.form.validate().then(res => {
          console.log(this.form)
          this.$request.post('/api/admin/login', this.form).then(res => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$.toast('用户名或密码不正确');
            } else {
              uni.showToast({
                title: "登录成功",
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    uni.$emit('refurbish', {})
                    uni.reLaunch({
                      url: "admin-nurse",
                      success(res) {
                        console.log(res);
                      },
                      fail(err) {
                        console.log(err);
                      }
                    });
                  }, 1000)
                }
              })
              uni.setStorageSync('user', res.data)
            }
          })
        }).catch(err => {
          console.log('表单错误信息：', err);
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
    flex: 1;
  }

  .logo {
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
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

  .body {
    height: 70vh;
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

  navigator {
    color: gray;
  }
</style>
