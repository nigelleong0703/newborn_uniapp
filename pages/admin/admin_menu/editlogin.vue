<template>
    <view class="content">
        <view class="form">
            <view class="form-content">
                <u--form labelPosition="left" :model="form1" ref="form1">
                    <view class="second-title">登录信息</view>
                    <u-form-item label="用户名" label-width="120" prop="username" ref="item4">
                        <u--input v-model="form1.username" placeholder="请输入用户名"></u--input>
                    </u-form-item>
                    <u-form-item label="旧密码" label-width="120" prop="oldpassword" ref="item5">
                        <u--input v-model="form1.oldpassword" placeholder="请输入旧密码" type='password'></u--input>
                    </u-form-item>
                    <u-form-item label="新密码" label-width="120" prop="password" ref="item5">
                        <u--input v-model="form1.password" placeholder="请输入新密码" type='password'></u--input>
                    </u-form-item>
                    <u-form-item label="新密码验证" label-width="120" prop="password_verify" ref="item6">
                        <u--input v-model="form1.password_verify" placeholder="请重新输入新密码" type='password'></u--input>
                    </u-form-item>
                </u--form>
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
export default {
    data() {
        return {
            oldusername: '',
            form1: {
                username: '',
                password: '',
                password_verify: '',
                oldpassword: ''
            },
            post1: {
                username: '',
                password: '',
            },
            rules: {
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
                'oldpassword': [{
                    type: 'string',
                    required: true,
                    message: '请填写密码',
                    trigger: ['blur', 'change']
                }, {
                    validator: this.validateOldPassword,
                    trigger: ['blur'],
                    required: true
                }],
            },
        }
    },
    onLoad(option) {
        this.$request.checkLogin();
        this.adminId = this.$db.get('current_user').id
        this.oldusername = this.$db.get('current_user').username
        this.form1.username = this.oldusername
        this.post1.username = this.oldusername
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
                uni.showLoading({
                    title: '加载中'
                });
                this.$request.editAdmin(this.adminId, this.post1).then(res => {
                    uni.hideLoading();
                    if (res.statusCode !== 200) {
                        this.$.toast('提交失败(' + res.statusCode + ')');
                    } else {
                        uni.showToast({
                            title: "修改成功！",
                            duration: 1000,
                            success: () => {
                                setTimeout(() => {
                                    let currentInfo = this.$db.get('current_user');
                                    currentInfo.username = this.post1.username;
                                    this.$db.set('current_user', currentInfo)
                                    uni.$emit('refurbish', {})
                                    uni.$emit('editAdminLogin', {})
                                    uni.navigateBack();
                                }, 1000)
                            }
                        })

                    }
                })

            }).catch(errors => {
                uni.$u.toast('信息有误')
                console.log(errors)
            })

        },
        reset() {
            const validateList = ['username', 'password',
                'password_verify', 'oldpassword'
            ]
            this.$refs.form1.resetFields()
            this.$refs.form1.clearValidate()
            this.$refs.form1.clearValidate(validateList)
            setTimeout(() => {
                this.$refs.form1.clearValidate(validateList)
            }, 10)
        },
        hideKeyboard() {
            uni.hideKeyboard()
        },

        validateOldPassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else {
                this.$request.adminLogin({
                    username: this.oldusername,
                    password: value
                }).then(res => {
                    if (res.statusCode == 200) {
                        callback()
                    } else {
                        callback(new Error('与旧密码不一致!'))
                    }
                })
            }
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
