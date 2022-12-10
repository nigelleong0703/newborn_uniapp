<template>
    <view class="content">
        <view class="body">
            <view class="patient-transfusion-info">
                <u-cell-group>
                    <u-cell title="时间" value=""></u-cell>
                    <u-cell title="地点" value=""></u-cell>
                    <u-cell title="输液速度" value=""></u-cell>
                    <u-cell title="医护人员" value=""></u-cell>
                    <u-cell title="静脉选择" value=""></u-cell>
                    <u-cell title="输液工具" value=""></u-cell>
                    <u-cell title="药物成分表" value=""></u-cell>
                </u-cell-group>
            </view>
            <view class="navigate-bar">
                <u-tabbar :value="value6" @change="name => value6 = name" :fixed="true" :border="false"
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
            value6: 1,
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
        },
        open(e) {
            // console.log('open', e)
        },
        close(e) {
            // console.log('close', e)
        },
        change(e) {
            // console.log('change', e)
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
