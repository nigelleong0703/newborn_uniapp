<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="patient-info">
                <u-cell-group>
                    <u-cell title="用户名" value="wxy"></u-cell>
                    <u-cell title="姓名" value="王小杨"></u-cell>
                    <u-cell title="性别" value="男"></u-cell>
                    <u-cell title="床号" value="A1-1"></u-cell>
                    <u-cell title="住院信息" value="住院中"></u-cell>
                    <u-cell title="体温" value="36.7"></u-cell>
                    <u-cell title="过敏信息" value="无"></u-cell>
                    <u-cell title="病症" value="发烧"></u-cell>
					<u-cell title="监护人姓名" value="刘大雅"></u-cell>
					<u-cell title="关系" value="母子"></u-cell>
					<u-cell title="身份证号码" value="78454839574"></u-cell>
					<u-cell title="联系电话" value="8617158390568"></u-cell>
					<u-cell title="医生姓名" value="刘小王"></u-cell>
					<u-cell title="部门" value="婴儿脑部科"></u-cell>
                </u-cell-group>
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
    height: 80vh;
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
