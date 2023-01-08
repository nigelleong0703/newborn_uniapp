<template>
    <view class="content">
        <view class="body">
            <view class="patient-transfusion-info">
                <view class="second-title">基本信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="患者姓名" :value="patientname" :border='false'></u-cell>
                    <u-cell title="护士姓名" :value="nursename" :border='false'></u-cell>
                    <u-cell title="输液开始时间" :value="transfusion_startTime" :border='false'></u-cell>
                    <u-cell title="输液结束时间" :value="transfusion_endTime" :border='false'></u-cell>
                </u-cell-group>
                <view class="second-title">输液信息</view>
                <u-cell-group :border='false'>
                    <u-cell title="输液名称" :value="transfusionInfo.name" :border='false'></u-cell>
                    <u-cell title="静脉选择" :value="vein_name" :border='false'></u-cell>
                    <u-cell title="输液工具选择" :value="tool_name" :border='false'></u-cell>
                    <u-cell title="输液状态" :value="status_name" :border='false'></u-cell>
                </u-cell-group>
                <view v-for="(drug, index) in drug" :key="drug.seq">
                    <view class="second-title">药物{{ drug.seq }}</view>
                    <u-cell-group :border='false'>
                        <u-cell title="药品" :value="drug_name_list[index]" :border='false'></u-cell>
                        <u-cell title="药物剂量（ml）" :value="drug.dose + '	ml'" :border='false'></u-cell>
                        <u-cell title="输液速度（滴/分钟）" :value="drug.rate + '	滴/分钟'" :border='false'></u-cell>
                        <u-cell title="开始时间" :value="drug.startTime" :border='false'></u-cell>
                        <u-cell title="状态" :value="drug_status_list[drug.status].name" :border='false'></u-cell>
                    </u-cell-group>
                </view>
                <view class="button">
                    <u-button type="primary" text="换药" shape="circle" size="normal" @click="change_drug"></u-button>
                    <u-button type="error" text="结束" shape="circle" size="normal" @click="finish"></u-button>
                </view>
                <view class="button">
                    <u-button type="primary" shape="circle" text="编辑" @click="transfusion_edit"></u-button>
                    <u-button type="error" shape="circle" text="删除" @click="transfusion_delete"></u-button>
                </view>
                <tabBar-nurse :currentPage="1"></tabBar-nurse>
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
            transfusionInfo: {
                info: '',
                name: ''
            },
            drug: [],
            transfusion_startTime: '',
            transfusion_endTime: '',
            drug_list: [],
            patientname: '',
            nursename: '',
            drug_status_list: [{
                id: 0,
                name: '已完成'
            }, {
                id: 1,
                name: '进行中'
            }, {
                id: 2,
                name: '未开始'
            }],
            vein_list: [{
                id: '',
                name: '',
            }],
            tool_list: [{
                id: '',
                name: '',
            }],
            vein_name: '',
            tool_name: '',
            status_name: '',
            drug_name: '',
            drug_status_name: '',
            transfusion_id: '',
            drug_name_list: [],
            drug_status_name_list: [],
        }
    },

    onLoad() {
        this.$request.checkLogin();
        let patient_name = this.$db.get('selected_patient')
        this.patientname = patient_name.name
        this.patientid = patient_name.id
        let nurse_name = this.$db.get('current_user')
        this.nursename = nurse_name.name
        let transfusion_info = this.$db.get('selected_transfusion')
        this.transfusion_id = transfusion_info.id
        this.getTransfusion_info()
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
        open(e) {
            // console.log('open', e)
        },
        close(e) {
            // console.log('close', e)
        },
        change(e) {
            // console.log('change', e)
        },
        transfusion_edit() {
            uni.navigateTo({
                url: '/pages/patient/edit-transfusion-info?id=' + this.patientid,
                success(res) {
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        transfusion_delete() {
            uni.showModal({
                content: '是否要删除该输液记录',
                success: (res) => {
                    if (res.confirm) {
                        let path = '/api/transfusion/delete/' + this.transfusion_id
                        this.$request.patch(path).then(res => {
                        })
                        uni.showToast({
                            title: "删除输液记录成功",
                            icon: 'none'
                        })
                        uni.reLaunch({
                            url: 'nurse-patient_transfusion'
                        })
                    }
                }
            })
        },
        getTransfusion_info() {
            //////////////////////////////////

            let that = this
            let path = '/api/transfusion/' + this.transfusion_id
            //////////////////////////////////
            that.$request.get(path).then(res => {
                that.transfusionInfo = res.data;
                that.transfusion_startTime = common.dateTimeStr(res.data.startTime);
                //当后端传回来是null的时候代表还没结束，直到点击结束按钮才更新输液结束时间
                if (res.data.finishTime == null) {
                    that.transfusion_endTime = "进行中"
                } else {
                    that.transfusion_endTime = common.dateTimeStr(res.data.finishTime);
                }
                that.drug = res.data.drug;
                that.$request.get('/api/list/drug').then(res => {
                    that.drug_list = res.data;
                    that.drug.forEach(function (item, index) {
                        that.drug_name_list.push(that.drug_list[item.drug - 1].name)
                        that.drug_status_name_list.push()
                    });
                })

                if (res.data.status == 0) {
                    that.status_name = "已完成";
                }
                else {
                    that.status_name = "正在进行第" + res.data.status + "个药品";
                }
                //////////////////////////////////
                that.$request.get('/api/list/vein').then(res => {
                    that.vein_list = res.data
                    that.vein_name = that.vein_list[(that.transfusionInfo.vein) - 1].name;
                })
                //////////////////////////////////
                that.$request.get('/api/list/tool').then(res => {
                    that.tool_list = res.data
                    that.tool_name = that.tool_list[(that.transfusionInfo.tool) - 1].name;
                })
            })
        },
        change_drug() {
            let path = '/api/transfusion/update/' + this.transfusion_id + '/next'
            this.$request.patch(path).then(res => {
                console.log(res)
            })
        },
        finish() {
            let path = '/api/transfusion/update/' + this.transfusion_id + '/finish'
            this.$request.patch(path).then(res => {
                console.log(res)
            })
        },
    },
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
