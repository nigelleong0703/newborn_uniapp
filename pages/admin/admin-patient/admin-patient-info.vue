<template>
    <view class="content">
        <view class="body">
            <view class="patient-info">
                <view class="second-title">患者信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="姓名" :value="patientInfo.name" :border='false'></u-cell>
                    <u-cell title="性别" :value="gender_name" :border='false'></u-cell>
                    <u-cell title="出生日期" :value="birthdate" :border='false'></u-cell>
                </u-cell-group>
                <view class="second-title">监护人信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="监护人 ID" :value="patientInfo.guardianId" :border='false'></u-cell>
                    <u-cell title="监护人姓名" :value="patientInfo.guardian" :border='false'></u-cell>
                    <u-cell title="关系" :value="relation_name" :border='false'></u-cell>
                    <u-cell title="联系电话" :value="patientInfo.tel" :border='false'></u-cell>
                </u-cell-group>
                <view class="second-title">住院信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="科室" :value="department_name" :border='false'></u-cell>
                    <u-cell title="房号" :value="patientInfo.room" :border='false'></u-cell>
                    <u-cell title="床号" :value="patientInfo.bed" :border='false'></u-cell>
                    <u-cell title="进院日期" :value="inDate" :border='false'></u-cell>
                    <u-cell title="过敏信息" :value="patientInfo.allergy" :border='false'></u-cell>
                </u-cell-group>
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
            relationList: [{
                id: 1,
                name: '父亲'
            }, {
                id: 2,
                name: '母亲'
            }, {
                id: 3,
                name: '爷爷'
            }, {
                id: 4,
                name: '奶奶'
            }, {
                id: 5,
                name: '亲戚'
            }, {
                id: 6,
                name: '其他'
            }],
            department_list: [],
            gender_list: [{
                id: 1,
                name: '男',
            }, {
                id: 2,
                name: '女',
            }],
            gender_name: '',
            relation_name: '',
            department_name: ''
        }
    },

    onLoad(option) {
        this.$request.checkLogin();
        if (option.id) {
            this.patient_id = option.id
        }
        this.getPatient_info()
        this.department_list = common.getDepartment_list()
    },

    methods: {
        patient_info() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_info',
                success(res) {
                },
                fail(err) {
                }
            })
        },
        getPatient_info() {
            this.$request.patientDetail(this.patient_id).then(res => {
                this.patientInfo = res.data;
                this.birthdate = this.$common.dateStr(res.data.birthdate);
                this.inDate = this.$common.dateTimeStr(res.data.inDate);
                this.gender_name = this.gender_list[(res.data.gender) - 1].name;
                this.relation_name = this.relationList[(res.data.relation) - 1].name;
                this.department_name = this.department_list[(res.data.department) - 1].name;
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
