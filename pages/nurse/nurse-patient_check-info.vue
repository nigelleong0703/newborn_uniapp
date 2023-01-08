<template>
    <view class="content">
        <view class="body">
            <!-- <view class="text-area">
                <text class="title">{{ title }}</text>
            </view> -->
            <view class="patient-check-info">
                <view class="second-title">巡视信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="患者姓名" :value="patientname" :border='false'></u-cell>
                    <u-cell title="护士姓名" :value="nursename" :border='false'></u-cell>
                    <u-cell title="巡房时间" :value="time" :border='false'></u-cell>
                    <u-cell title="患者状态/隐患" :value="checkInfo.info" :border='false'></u-cell>
                </u-cell-group>
            </view>
            <view class="button">
                <u-button type="primary" shape="circle" text="编辑" @click="check_edit"></u-button>
                <u-button type="error" shape="circle" text="删除" @click="check_delete"></u-button>
            </view>
            <!--            <view class="navigate-bar">
                <u-tabbar :value="value7" @change="name => value7 = name" :fixed="true" :border="false"
                    :placeholder="true" :safeAreaInsetBottom="true">
                    <u-tabbar-item text="基本信息" icon="account" @click="patient_info"></u-tabbar-item>
                    <u-tabbar-item text="输液记录" icon="pushpin-fill" @click="patient_transfusion"></u-tabbar-item>
                    <u-tabbar-item text="巡视记录" icon="eye-fill" @click="patient_check"></u-tabbar-item>
                </u-tabbar>
            </view> -->
            <tabBar-nurse :currentPage="2"></tabBar-nurse>
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
            checkInfo: {
                info: ''
            },
            time: '',
            patientid: '',
            patientname: '',
            nursename: '',
            check_id: ''
        }
    },

    onLoad() {
        this.$request.checkLogin();
        let patient_name = uni.getStorageSync('selected_patient')
        this.patientname = patient_name.name
        this.patientid = patient_name.id
        let nurse_name = uni.getStorageSync('current_user')
        this.nursename = nurse_name.name
        let check_info = uni.getStorageSync('selected_check')
        console.log(check_info)
        this.check_id = check_info.id
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
        check_edit() {
            uni.navigateTo({
                url: '/pages/patient/edit-ward-info?id=' + this.patientid,
                success(res) {
                    console.log(res);
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        check_delete() {
            uni.showModal({
                content: '是否要删除该巡视记录',
                success: (res) => {
                    if (res.confirm) {
                        let path = '/api/check/delete/' + this.check_id
                        this.$request.patch(path).then(res => {
                            console.log(res)
                        })
                        uni.showToast({
                            title: "删除巡视记录成功",
                            icon: 'none'
                        })
                        uni.reLaunch({
                            url: 'nurse-patient_check'
                        })
                    }
                }
            })
        },
        getCheck_info() {
            let path = '/api/check/' + this.check_id
            //////////////////////////////////
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

.second-title {
    margin-left: 10px;
    font-size: 25px;
    font-weight: bold;
    display: flex;
    justify-content: left;
}

.button {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
}
</style>
