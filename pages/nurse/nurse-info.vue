<template>
    <view class="content">
        <view class="body">
            <view class="text-area">
                <text class="title">{{ title }}</text>
            </view>
            <view class="nurse-info">
                <u-cell-group :border='false'>
                    <u-cell title="姓名" :value="nurseInfo.name" :border='false'></u-cell>
                    <u-cell title="性别" :value="gender_name" :border='false'></u-cell>
                    <u-cell title="科室" :value="department_name" :border='false'></u-cell>
                    <u-cell title="联系电话" :value="nurseInfo.tel" :border='false'></u-cell>
                </u-cell-group>
<!--                <view class="navigate-bar">
                    <u-tabbar :value="value2" @change="name => value2 = name" :fixed="true" :border="false"
                        :placeholder="true" :safeAreaInsetBottom="true">
                        <u-tabbar-item text="首页" icon="home" @click="patient_list"></u-tabbar-item>
                        <u-tabbar-item text="我的" icon="account" @click="nurse_info"></u-tabbar-item>
                    </u-tabbar>
                </view> -->
				<tabBar-info :currentPage="1"></tabBar-info>
            </view>
            <view class="button">
                <u-button type="error" shape="circle" @click="logout" text="登出"></u-button>
            </view>
        </view>
    </view>
</template>

<script>
import common from "common/js/common.js"
export default {
    data() {
        return {
            title: "护士资料",
            value2: 1,
            nurseInfo: {
				name:'',
				tel:''
			},
            genderList: [{
                id: 1,
                name: '男',
            },{
                id: 2,
                name: '女',
            }],
			departmentList:'',
            gender_name:'',
			department_name:''
        }
    },

    onLoad() {
        this.getNurse_info()
		this.departmentList = common.getDepartment_list()
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
                console.log(res)
				this.gender_name=this.genderList[(res.data.gender)-1].name;
				this.department_name=this.departmentList[(res.data.department)-1].name;
            })
        },
        logout() {
            uni.showModal({
                content: '是否要退出登录',
                success: (res) => {
                    if (res.confirm) {
                        this.$db.set('login_status', false)
                        this.$db.clear()
                        uni.showToast({
                            title: "退出登录成功",
                            icon: 'none'
                        })
                        uni.reLaunch({
                            url: '/pages/index/index'
                        })
                    }
                }
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

.button {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20%;
    margin-left: 20%;
}
</style>