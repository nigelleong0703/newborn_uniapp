<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="nurse-info">
                <u-cell-group :border='false'>
                    <u-cell title="ID" :value="nurseInfo.id" :border='false'></u-cell>
                    <u-cell title="姓名" :value="nurseInfo.name" :border='false'></u-cell>
                    <u-cell title="性别" :value="nurse_gender" :border='false'></u-cell>
                    <u-cell title="科室" :value="nurseInfo.department" :border='false'></u-cell>
                    <u-cell title="联系电话" :value="nurseInfo.tel" :border='false'></u-cell>
                    <u-cell title="状态" :value="nurseInfo.status" :border='false'></u-cell>
                </u-cell-group>
                <view class="navigate-bar">
                    <u-tabbar :value="value2" @change="name => value2 = name" :fixed="true" :border="false"
                        :placeholder="true" :safeAreaInsetBottom="true">
                        <u-tabbar-item text="首页" icon="home" @click="patient_list"></u-tabbar-item>
                        <u-tabbar-item text="我的" icon="account" @click="nurse_info"></u-tabbar-item>
                    </u-tabbar>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: "护士资料",
            value2: 1,
            nurseInfo: '',
            nurse_gender: ''
        }
    },

    onLoad() {
        this.getNurse_info()
    },

    methods: {
        change(e) {
            this.value2 = e
            console.log('change2', e)
        },
        patient_list() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-patient_list'
            })
        },
        nurse_info() {
            uni.navigateTo({
                url: '/pages/nurse/nurse-info'
            })
        },
        getNurse_info() {
            let nurse_info = uni.getStorageSync('current_user')
            let path = '/api/nurse/' + nurse_info.id
            console.log(path)
            this.$request.get(path).then(res => {
                this.nurseInfo = res.data;
                if (res.data.gender == 0) {
                    this.nurse_gender = '男';
                }

                else if (res.data.gender == 1) {
                    this.nurse_gender = '女';
                }
                console.log(res)
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
</style>
