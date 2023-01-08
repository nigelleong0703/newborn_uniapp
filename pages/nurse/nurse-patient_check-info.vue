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
            check_id: '',
            time_unix: Number()
        }
    },

    onLoad() {
        this.$request.checkLogin();
        this.getCheck_info()
    },

    methods: {
        patient_info() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_info',
                success(res) {
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
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        check_edit() {
            let editCheck = {
                nursename: this.nursename,
                patientname: this.patientname,
                nurseId: this.$db.get('selected_check').nurseId,
                time: this.time_unix
            }
            this.$db.set('edit_check', editCheck)
            uni.navigateTo({
                url: '/pages/patient/edit-ward-info?id=' + this.patientid,
                success(res) {
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
                        this.$request.deleteCheck(this.check_id).then(res => {
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
            let patient_name = this.$db.get('selected_patient')
            let that = this
            this.patientname = patient_name.name
            this.patientid = patient_name.id
            let check_info = this.$db.get('selected_check')
            this.check_id = check_info.id
            this.time_unix = check_info.time
            this.time = common.dateTimeStr(check_info.time);
            this.$request.nurseDetail(check_info.nurseId).then(res => {
                that.nursename = res.data.name
            })
            this.checkInfo.info = check_info.info
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
