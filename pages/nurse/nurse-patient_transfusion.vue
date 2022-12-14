<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="button">
                <u-button type="primary" icon="plus" shape="circle" @click="add_transfusion"></u-button>
            </view>
            <view v-for="(transfusion, index) in transfusionList" :key="transfusion.seq">
                <u-cell-group>
                    <u-cell :title="'输液记录' + '	' + (index + 1)" @click="cell_click(transfusion)" :border='false'
                        :isLink='true' customStyle="margin-bottom: 5px"></u-cell>
                </u-cell-group>
            </view>
            <view class="navigate-bar">
                <u-tabbar :value="value4" @change="name => value4 = name" :fixed="true" :border="false"
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
            title: '输液记录',
            value4: 1,
            transfusionList: [],
            patient_id: '',
        }
    },

    onLoad() {
        let patient_info = uni.getStorageSync('selected_patient')
        console.log(patient_info)
        this.patient_id = patient_info.id
        this.getTransfusion_list()
    },

    methods: {
        add_transfusion() {
            uni.navigateTo({
                url: '/pages/patient/add-patient-transfusion?id=' + this.patient_id,
                success(res) {
                    console.log(res);
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
		cell_click(transfusion) {
			uni.setStorageSync('selected_transfusion', transfusion)
			console.log(uni.getStorageSync('selected_transfusion'))
		    uni.navigateTo({
		        url: "nurse-patient_transfusion-info"
		    })
		},
        getTransfusion_list() {
            let path = '/api/transfusion?patientId=' + this.patient_id
            console.log(path)
            this.$request.get(path).then(res => {
                console.log(res)
                this.transfusionList = res.data.transfusion;
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
