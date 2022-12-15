<template>
    <view class="content">
        <view class="body">
            <!-- <view class="text-area">
			    <text class="title">{{ title }}</text>
			</view> -->
            <view class="patient-transfusion-info">
                <view class="second-title">基本信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="患者姓名" :value="patientname" :border='false'></u-cell>
                    <u-cell title="护士姓名" :value="nursename" :border='false'></u-cell>
                    <u-cell title="输液开始时间" :value="transfusion_startTime" :border='false'></u-cell>
                    <u-cell title="输液结束时间" :value="transfusion_endTime" :border='false'></u-cell>
                    <u-cell title="其他信息" :value="transfusionInfo.info" :border='false'></u-cell>
                </u-cell-group>
                <view class="second-title">输液信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="输液名称" :value="transfusionInfo.name" :border='false'></u-cell>
                    <u-cell title="静脉选择" :value="vein_list[(transfusionInfo.vein) - 1].name" :border='false'></u-cell>
                    <u-cell title="输液工具选择" :value="tool_list[(transfusionInfo.tool) - 1].name" :border='false'></u-cell>
                    <u-cell title="输液状态" :value="status_list[transfusionInfo.status].name" :border='false'></u-cell>
                </u-cell-group>
                <view v-for="(drug, index) in drug" :key="drug.seq">
                    <view class="second-title">药物{{ drug.seq }}</view>
                    <u-cell-group :border='false'>
                        <u-cell title="药品" :value="drug_list[(drug.drug) - 1].name" :border='false'></u-cell>
                        <u-cell title="药物剂量" :value="drug.dose + 'ml'" :border='false'></u-cell>
                        <u-cell title="输液速度" :value="drug.rate + '	滴/分钟'" :border='false'></u-cell>
                        <u-cell title="开始时间" :value="drug_startTime" :border='false'></u-cell>
                        <u-cell title="状态" :value="drug_status_list[drug.status].name" :border='false'></u-cell>
                    </u-cell-group>
                </view>
                <view class="button">
                    <u-button type="primary" text="换药" shape="circle" size="normal" @click=""></u-button>
                    <u-button type="error" text="结束" shape="circle" size="normal" @click=""></u-button>
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
    </view>
</template>

<script>
import common from "common/js/common.js"
export default {
    data() {
        return {
            title: "患者: 王小杨",
            value6: 1,
            transfusionInfo: '',
            drug: [],
            transfusion_startTime: '',
            transfusion_endTime: '',
            drug_startTime: '',
            vein_list: [],
            tool_list: [],
            drug_list: [],
            patientname: '',
            nursename: '',
            status_list: [{
                id: 0,
                name: '已完成'
            }, {
                id: 1,
                name: '正进行到第 1 个药品'
            }, {
                id: 2,
                name: '正进行到第 2 个药品'
            }, {
                id: 3,
                name: '正进行到第 3 个药品'
            }, {
                id: 4,
                name: '正进行到第 4 个药品'
            }, {
                id: 5,
                name: '正进行到第 5 个药品'
            }, {
                id: 6,
                name: '正进行到第 6 个药品'
            }],
            drug_status_list: [{
                id: 0,
                name: '已完成'
            }, {
                id: 1,
                name: '进行中'
            },{
                id: 2,
                name: '未开始'
            }]
        }
    },

    onLoad() {
        let patient_name = uni.getStorageSync('selected_patient')
        this.patientname = patient_name.name
        let nurse_name = uni.getStorageSync('current_user')
        this.nursename = nurse_name.name
        let patient_info = uni.getStorageSync('selected_transfusion')
        console.log(patient_info)
        this.patient_id = patient_info.id
        this.getTransfusion_info()
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
        },
        getTransfusion_info() {
            let path = '/api/transfusion/' + this.patient_id
            //////////////////////////////////
            this.$request.get(path).then(res => {
                console.log(res)
                this.transfusionInfo = res.data;
                this.transfusion_startTime = common.dateTimeStr(res.data.startTime);
                this.transfusion_endTime = common.dateTimeStr(res.data.endTime);
                this.drug = res.data.drug;
                this.drug_startTime = common.dateTimeStr(res.data.drug.startTime);
            })
            //////////////////////////////////
            this.$request.get('/api/list/vein').then(res => {
                console.log(res)
                this.vein_list = res.data;
            })
            //////////////////////////////////
            this.$request.get('/api/list/tool').then(res => {
                console.log(res)
                this.tool_list = res.data;
            })
            //////////////////////////////////
            this.$request.get('/api/list/drug').then(res => {
                console.log(res)
                this.drug_list = res.data;
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
