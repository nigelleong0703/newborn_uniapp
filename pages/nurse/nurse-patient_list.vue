<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
			<view class="patient-list">
			    <u-cell-group>
			        <u-cell icon="man" title="P0001 王小杨" isLink url='/pages/nurse/nurse-patient_info'></u-cell>
			        <u-cell icon="woman" title="P0002 梁小花" isLink url='/pages/nurse/nurse-patient_info'></u-cell>
			        <u-cell icon="woman" title="P0003 王大花" isLink url='/pages/nurse/nurse-patient_info'></u-cell>
			        <u-cell icon="man" title="P0004 梁大杨" isLink url='/pages/nurse/nurse-patient_info'></u-cell>
			    </u-cell-group>
			</view>
            <view class="navigate-bar">
                <u-tabbar :value="value1" @change="name => value1 = name" :fixed="true" :border="false"
                    :placeholder="true" :safeAreaInsetBottom="true">
                    <u-tabbar-item text="首页" icon="home" name="patient_list" @click="patient_list"></u-tabbar-item>
                    <u-tabbar-item text="我的" icon="account" name="info" @click="nurse_info"></u-tabbar-item>
                </u-tabbar>
            </view>     
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "患者列表",
			value1:0
        }
    },

    onLoad() {
    },

    methods: {
        patient_list() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_list'
            })
        },
        nurse_info() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-info'
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
</style>
