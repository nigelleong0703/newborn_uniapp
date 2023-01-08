<template>
    <view class="content">
        <view class="form">
            <view class="form-content">
                <u--form labelPosition="left" :model="form1" ref="form1">
                    <view class="second-title">管理员基本信息</view>
                    <u-form-item label="姓名" label-width="120" prop="name" ref="item1">
                        <u--input v-model="form1.name" placeholder="请输入护士姓名"></u--input>
                    </u-form-item>
                    <u-form-item label="科室" label-width="120" prop="department" ref="item2"
                        @click="department_picker = true; hideKeyboard()">
                        <u--input v-model="form1.department" disabled disabledColor="#ffffff" placeholder="请选择科室"
                            border="none">
                        </u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item label="状态" label-width="120" prop="status" ref="item3">
                        <u--input v-model="form1.status" placeholder="请填写状态"></u--input>
                    </u-form-item>
                    <view class="second-title">登录信息</view>
                    <u-form-item label="用户名" label-width="120" prop="username" ref="item4">
                        <u--input v-model="form1.username" placeholder="请输入用户名"></u--input>
                    </u-form-item>
                    <u-form-item label="密码" label-width="120" prop="password" ref="item5">
                        <u--input v-model="form1.password" placeholder="请输入新的密码" type='password'></u--input>
                    </u-form-item>
                    <u-form-item label="密码验证" label-width="120" prop="password_verify" ref="item6">
                        <u--input v-model="form1.password_verify" placeholder="请重新输入密码" type='password'></u--input>
                    </u-form-item>
                </u--form>
                <u-action-sheet :show="department_picker" :actions="department_list" title="科室选择" description="请选择负责科室"
                    closeOnClickOverlay @close="department_picker = false" @select='department_select'>
                </u-action-sheet>
            </view>
        </view>
        <view class=bottom-button>
            <u-button type="primary" shape="circle" text="提交" customStyle="margin-top: 30px" @click="submit"></u-button>
            <u-button type="error" shape="circle" text="重置" customStyle="margin-top: 20px; margin-bottom: 30px"
                @click="reset"></u-button>
        </view>
    </view>
</template>

<script>
import common from "common/js/common.js"
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form1.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            department_picker: false,
            form1: {
                username: '',
                password: '',
                name: '',
                department: '',
                status: '',
                password_verify: '',
            },
            post: {
                username: '',
                password: '',
                name: '',
                department: '',
                status: '',
                password_verify: '',
            },
            post1: {
                username: '',
                password: '',
                name: '',
                department: '',
                status: '',
            },
            department_list: [],
            rules: {
                'name': [{
                    type: 'string',
                    required: true,
                    message: '请填写姓名',
                    trigger: ['blur', 'change']
                }, {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.chinese(value);
                    },
                    message: "姓名必须为中文",
                    trigger: ["change", "blur"],
                }],
                'username': [{
                    type: 'string',
                    required: true,
                    message: '请填写用户名',
                    trigger: ['blur', 'change']
                }, {
                    validator: this.$common.validateUsername,
                    trigger: ['blur', 'change']
                }],
                'password': [{
                    type: 'string',
                    required: true,
                    message: '请填写密码',
                    trigger: ['blur', 'change']
                }, {
                    validator: this.$common.validatePassword,
                    trigger: ['blur', 'change']
                }],
                'password_verify': [{
                    type: 'string',
                    required: true,
                    message: '请填写密码',
                    trigger: ['blur', 'change']
                }, {
                    validator: this.validateSamePassword,
                    trigger: ['blur', 'change'],
                    required: true
                }],
                'status': [{
                    type: 'number',
                    required: false,
                    message: '请填写有效状态',
                    trigger: ['blur', 'change']
                }]
            },
        }
    },
    onLoad(option) {
        this.$request.checkLogin();
        this.$request.get('/api/list/department').then(res => {
            this.department_list = res.data
        })
    },
    onReady() {
        this.$refs.form1.setRules(this.rules)
    },
    methods: {
        navigateBack() {
            uni.navigateBack()
        },
        change(e) {
            // console.log('change', e);
        },
        submit() {
            // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
            this.$refs.form1.validate().then(res => {
                this.post1.username = this.form1.username
                this.post1.password = this.form1.password
                this.post1.name = this.form1.name
                if (this.post.department == '') {
                    this.post1.department = 0
                } else {
                    this.post1.department = this.post.department
                }
                this.post1.status = this.post.status
                uni.showLoading({
                    title: '加载中'
                });
                this.$request.post('/api/admin/add', this.post1).then(res => {
                    uni.hideLoading();
                    if (res.statusCode !== 200) {
                        this.$.toast('提交失败(' + res.statusCode + ')');
                    } else {
                        uni.showToast({
                            title: "添加成功！",
                            duration: 1000,
                            success: () => {
                                setTimeout(() => {
                                    uni.$emit('refurbish', {})
                                    uni.navigateBack();
                                }, 1000)
                            }
                        })

                    }
                })

            }).catch(errors => {
                uni.$u.toast('信息有误')
            })

        },
        reset() {
            const validateList = ['username', 'password', 'name',
                'password_verify', 'status'
            ]
            this.$refs.form1.resetFields()
            this.form1.department = ''
            this.$refs.form1.clearValidate()
            this.$refs.form1.clearValidate(validateList)
            setTimeout(() => {
                this.$refs.form1.clearValidate(validateList)
            }, 10)
        },
        hideKeyboard() {
            uni.hideKeyboard()
        },
        department_select(e) {
            this.form1.department = e.name
            this.post.department = e.id
        },
        validateSamePassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form1.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
    },
}
</script>

<style lang="scss">
.content {
    min-height: 100%;
}

.form-content {
    margin-top: 20px;
    margin-left: 5%;
    margin-right: 5%;
}

.bottom-button {
    width: 80%;
    margin-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
    padding-bottom: 10px
}

/deep/ .u-form-item {
    padding: 0 0 5rpx;

    .u-form-item--left_content_label {
        font-size: 32rpx;
        line-height: 94rpx;
    }
}

.u-form-item_body {
    align-items: flex-start;
}

.u-input {
    box-sizing: border-box;
    padding: 26rpx 30rpx;
    border-radius: 16rpx;
    font-size: 30rpx;
    color: #333;
}

.second-title {
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
}
</style>
