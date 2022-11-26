<template>
    <view class="content">
        <view class="header">
            <image mode="aspectFit" src="/static/logo.jpg"></image>
        </view>
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
        <view class="btn-area">
            <u-button class='button' type='default' size="large" color='orange' @click="navigateAdmin" text="管理员 Admin">
            </u-button>
            <u-button class='button' type='default' size='large' color='orange' @click="navigateNurse" text="护士 Nurse">
            </u-button>
            <u-button class='button' type='default' size='large' color='orange' disabled=true @click="navigateDoctor"
                text="医生 Doctor">
            </u-button>
            <u-button class='button' type='default' size='large' color='orange' disabled=true @click="navigatePatient"
                text="患者 Patient">
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
    onLoad() {

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

.btn-area {
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 15vw;
    font-weight: bold;
}
</style>
