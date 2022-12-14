<template>
    <view class="content">
        <view class="body">
            <!-- <view class="text-area">
			    <text class="title">{{ title }}</text>
			</view> -->
            <view class="patient-info">
                <view class="second-title">患者信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="患者ID" :value="patientInfo.id" :border='false'></u-cell>
                    <u-cell title="姓名" :value="patientInfo.name" :border='false'></u-cell>
                    <u-cell title="性别" :value="patientInfo.gender" :border='false'></u-cell>
                    <u-cell title="出生日期" :value="birthdate" :border='false'></u-cell>
                </u-cell-group>
                <view class="second-title">监护人信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="监护人ID" :value="patientInfo.guardianId" :border='false'></u-cell>
                    <u-cell title="监护人姓名" :value="patientInfo.guardian" :border='false'></u-cell>
                    <u-cell title="关系" :value="relationList[(patientInfo.relation) - 1].name" :border='false'></u-cell>
                    <u-cell title="联系电话" :value="patientInfo.tel" :border='false'></u-cell>
                </u-cell-group>
                <view class="second-title">入院信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="科室" :value="department_list[patientInfo.department - 1].name"
                        :border='false'></u-cell>
                    <u-cell title="房号" :value="patientInfo.room" :border='false'></u-cell>
                    <u-cell title="床号" :value="patientInfo.bed" :border='false'></u-cell>
                    <u-cell title="进院日期" :value="inDate" :border='false'></u-cell>
                    <u-cell title="出院日期" :value="outDate" :border='false'></u-cell>
                    <u-cell title="过敏信息" :value="patientInfo.allergy" :border='false'></u-cell>
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
import common from "common/js/common.js"
export default {
    data() {
        return {
            title: "基本信息",
            value3: 0,
            patientInfo: '',
            birthdate: '',
            inDate: '',
            outDate: '',
            relationList: [{
                id: 1,
                name: '父亲',
            }, {
                id: 2,
                name: '母亲',
            }, {
                id: 3,
                name: '爷爷',
            }, {
                id: 4,
                name: '奶奶',
            }, {
                id: 5,
                name: '亲戚',
            }, {
                id: 6,
                name: '其他',
            }],
            department_list: []
        }
    },

    onLoad() {
        let patient_info = uni.getStorageSync('selected_patient')
        console.log(patient_info)
        this.patient_id = patient_info.id
        this.getPatient_info()
        this.department_list = common.getDepartment_list()
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
        getPatient_info() {
            let path = '/api/patient/' + this.patient_id
            this.$request.get(path).then(res => {
                console.log(res)
                this.patientInfo = res.data;
                this.birthdate = common.dateTimeStr(res.data.birthdate);
                this.inDate = common.dateTimeStr(res.data.inDate);
                this.outDate = common.dateTimeStr(res.data.outDate);
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
    margin-top: -10px;
    margin-bottom: 10px;
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
