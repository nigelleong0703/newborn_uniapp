<template>
    <view class="content">
        <view class="body">
            <!-- <view class="text-area">
                <text class="title">{{ title }}</text>
            </view> -->
            <view class="patient-check-info">
                <view class="second-title">巡视信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="巡视 ID" :value="checkInfo.id" :border='false'></u-cell>
                    <u-cell title="患者 ID" :value="checkInfo.patientId" :border='false'></u-cell>
                    <u-cell title="护士 ID" :value="checkInfo.nurseId" :border='false'></u-cell>
                    <u-cell title="巡房时间" :value="time" :border='false'></u-cell>
                    <u-cell title="输液 ID" :value="checkInfo.transfusionId" :border='false'></u-cell>
                    <u-cell title="患者状态/隐患" :value="checkInfo.info" :border='false'></u-cell>

                </u-cell-group>
            </view>
            <view class="navigate-bar">
                <u-tabbar :value="value7" @change="name => value7 = name" :fixed="true" :border="false"
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
import common from "common/js/common.js"
export default {
    data() {
        return {
            title: "患者: 王小杨",
            value7: 2,
            checkInfo: '',
            time: ''
        }
    },

    onLoad() {
        let patient_info = uni.getStorageSync('selected_patient')
        console.log(patient_info)
        this.patient_id = patient_info.id
        this.getCheck_info()
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
        getCheck_info() {
            let path = '/api/check/' + this.patient_id
            this.$request.get(path).then(res => {
                console.log(res)
                this.checkInfo = res.data;
                this.time = common.dateTimeStr(res.data.time);
            })
        }
    }
}
</script>

<style>
.content {
    height: 70vh;
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

.second-title {
    margin-left: 10px;
    font-size: 25px;
    font-weight: bold;
    display: flex;
    justify-content: left;
}
</style>
