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
                <view class="form-element">
                    <u--input placeholder="输入用户名" border="surround" v-model="username" clearable>
                    </u--input>
                </view>
                <view class="form-element">
                    <u--input placeholder="输入密码" border="surround" v-model="password" password clearable></u--input>
                </view>
                <view class="form-element">
                    <u-button class='button' type='default' size="large" color='orange' @click="checklogin" text="登录">
                    </u-button>
                </view>
            </view>
            <view class="login-bottom">
                <navigator url="/pages/contact-admin/contact-admin" open-type="navigate">联系管理员</navigator>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "欢迎护士"
        }
    },
    onLoad() {

    },
    methods: {
        checklogin() {
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
                fail: () => { },
                complete: () => { }
            })
        },
        navadmin() {
            uni.navigateTo({
                url: "pages/contact-admin/contact-admin",
            })
        },
        checklogin() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_list'
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

.login-bottom {
    margin-top: auto;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8vh;
}

navigator {
    color: gray;
}
</style>
