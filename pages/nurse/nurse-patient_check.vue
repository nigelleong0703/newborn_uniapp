<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="button">
                <u-button type="primary" icon="plus" shape="circle" @click="add_ward"></u-button>
            </view>
            <view v-for="(check, index) in checkList" :key="check.seq">
                <u-cell-group>
                    <u-cell :title="'巡视记录' + '	' + (index + 1) + ' - ' + timelist[index]" @click="cell_click(check)"
                        :border='false' :isLink='true' customStyle="margin-bottom: 5px"></u-cell>
                </u-cell-group>
            </view>
            <!--            <view class="navigate-bar">
                <u-tabbar :value="value5" @change="name => value5 = name" :fixed="true" :border="false"
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
export default {
    data() {
        return {
            title: "巡视记录",
            value5: 2,
            checkList: [],
            patient_id: '',
            timelist: [],
        }
    },

    onLoad() {
        this.$request.checkLogin();
        let patient_info = this.$db.get('selected_patient')
        this.patient_id = patient_info.id
        this.getCheck_list()
    },

    onShow() {
        this.getCheck_list()
    },

    methods: {
        add_ward() {
            uni.navigateTo({
                url: '/pages/patient/add-patient-ward?id=' + this.patient_id,
                success(res) {
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
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
        cell_click(check) {
            this.$db.set('selected_check', check)
            uni.navigateTo({
                url: "nurse-patient_check-info"
            })
        },
        getCheck_list() {
            let that = this
            this.$request.getCheckList(this.patient_id).then(res => {
                this.checkList = res.data.check;
                this.checkList.forEach(function (item, index) {
                    that.timelist.push(that.$common.dateTimeStr(item.time))
                })
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

.button {
    width: 15%;
    margin-top: 2%;
    margin-left: 83%;
    padding-bottom: 20rpx;
}
</style>
