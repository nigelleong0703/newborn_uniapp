<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="navigate-bar">
                <u-tabbar :value="value1" @change="name => value1 = name" :fixed="true" :border="false"
                    :placeholder="true" :safeAreaInsetBottom="true">
                    <u-tabbar-item text="基本信息" icon="account" @click="click1"></u-tabbar-item>
                    <u-tabbar-item text="输液记录" icon="pushpin-fill" @click="click1"></u-tabbar-item>
                    <u-tabbar-item text="巡视记录" icon="eye-fill" @click="click1"></u-tabbar-item>
                </u-tabbar>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "患者: 王小杨",
            value1: 0,
        }
    },

    onLoad() {
    },

    methods: {
        click1(e) {
            console.log('click1', e);
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
}

.body {
    height: 70vh;
    display: flex;
    flex-direction: column;
}

.navigate-bar {
    height: 100vh;
}
</style>
