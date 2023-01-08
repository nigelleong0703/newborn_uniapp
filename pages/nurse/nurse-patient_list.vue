<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="button">
                <u-button type="primary" icon="plus" shape="circle" @click="add_patient"></u-button>
            </view>
            <view v-for="(patient, index) in patientList" :key="patient.seq">
                <u-cell-group>
                    <u-cell icon="account-fill" :title="patient.id + '	' + patient.name" @click="cell_click(patient)"
                        :border='false' :isLink='true' customStyle="margin-bottom: 5px"></u-cell>
                </u-cell-group>
            </view>
            <!--            <view class="navigate-bar">
                <u-tabbar :value="value1" @change="name => value1 = name" :fixed="true" :border="false"
                    :placeholder="true" :safeAreaInsetBottom="true">
                    <u-tabbar-item text="首页" icon="home" @click="patient_list"></u-tabbar-item>
                    <u-tabbar-item text="我的" icon="account" @click="nurse_info"></u-tabbar-item>
                </u-tabbar>
            </view> -->
            <tabBar-info :currentPage="0"></tabBar-info>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "患者列表",
            value1: 0,
            patientList: [{
                gender: '',
                id: '',
                name: '',
                seq: ''
            }],
        }
    },

    onLoad() {
        this.$request.checkLogin();
        this.getPatient_list()
    },

    mounted() {
        var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
        if (backbutton) backbutton.style.display = 'none';
    },

    methods: {
        add_patient() {
            uni.navigateTo({
                url: '/pages/patient/add-patient',
                success(res) {
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        change(e) {
            this.value1 = e
        },
        patient_list(e) {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_list'
            })
        },
        nurse_info(e) {
            uni.navigateTo({
                url: '/pages/nurse/nurse-info'
            })
        },
        getPatient_list() {
            let nurse_info = this.$db.get('current_user')
            this.$request.getPatientList(nurse_info.department).then(res => {
                this.patientList = res.data.patient;
            })
        },
        cell_click(patient) {
            this.$db.set('selected_patient', patient)
            uni.navigateTo({
                url: "nurse-patient_info"
            })
        },
        onBackPress(options) {
            if (options.from == 'backbutton' || 'navigateBack') {
                return true;
            }
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

.button {
    width: 15%;
    margin-top: 2%;
    margin-left: 83%;
    padding-bottom: 20rpx;
}
</style>
