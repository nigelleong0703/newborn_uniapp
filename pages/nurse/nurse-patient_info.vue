<template>
    <view class="content">
        <view class="body">
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
                <u-tabbar :value="value3" @change="name => value3 = name" :fixed="true" :border="false"
                    :placeholder="true" :safeAreaInsetBottom="true">
                    <u-tabbar-item text="基本信息" icon="account" @click="patient_info"></u-tabbar-item>
                    <u-tabbar-item text="输液记录" icon="pushpin-fill" @click="patient_transfusion"></u-tabbar-item>
                    <u-tabbar-item text="巡视记录" icon="eye-fill" @click="patient_check"></u-tabbar-item>
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
            value3: 0,
        }
    },

    onLoad() {
    },

    methods: {
        patient_info() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_info',
                success(res) {
                    console.log(res);
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        patient_transfusion() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_transfusion',
                success(res) {
                    console.log(res);
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        patient_check() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_check',
                success(res) {
                    console.log(res);
                },
                fail(err) {
                    console.log(err);
                }
            })
        }
    }
}
</script>

<style>
.content {
    height: 75vh;
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
