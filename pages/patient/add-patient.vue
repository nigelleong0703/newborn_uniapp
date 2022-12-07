<template>
    <view class="content">
        <view class="form">
            <view class="form-content">
                <u--form labelPosition="left":model="model1" ref="form1">
                    <u-form-item prop="userInfo.name" ref="item1">
                        <u--input v-model="model1.userInfo.name" placeholder="患者姓名"></u--input>
                    </u-form-item>
                    <u-form-item prop="userInfo.gender" ref="item2">
                        <u-radio-group v-model="model1.userInfo.gender">
                            <u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in genderlist":key="index":label="item.name":name="item.name">
                            </u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item prop="temperature" ref="item3">
                        <u--input v-model="model1.temperature" placeholder="体温"></u--input>
                    </u-form-item>
                    <u-form-item prop="symptoms" ref="item4">
                        <u--textarea placeholder="症状" v-model="model1.symptoms" count></u--textarea>
                    </u-form-item>
                    <u-form-item prop="allergic" ref="item5">
                        <u--textarea placeholder="过敏信息" v-model="model1.allergic" count></u--textarea>
                    </u-form-item>
                    <u-form-item prop="guardianInfo.name" ref="item6">
                        <u--input v-model="model1.guardianInfo.name" placeholder="监护人姓名"></u--input>
                        </u--input>
                    </u-form-item>
                    <u-form-item prop="guardianInfo.relation" ref="item7"
                        @click="guardian_picker = true; hideKeyboard()" borderBottom>
                        <u--input v-model="model1.guardianInfo.relation" disabled disabledColor="#ffffff"
                            placeholder="请选择监护人信息" border="none">
                        </u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item prop="guardianInfo.ID" ref="item8">
                        <u--input v-model="model1.guardianInfo.ID" placeholder="监护人身份证号码"></u--input>
                    </u-form-item>
                    <u-form-item prop="guardianInfo.phone" ref="item9">
                        <u--input v-model="model1.guardianInfo.phone" placeholder="监护人联系电话号码"></u--input>
                    </u-form-item>
                </u--form>
                <u-action-sheet :show="guardian_picker":actions="guardian_list" title="监护人关系" dexcription="请选择监护人与患者关系"
                    closeOnClickOverlay @close="guardian_picker = false" @select='guardianRelation_select'>
                </u-action-sheet>
            </view>
        </view>
        <view class=bottom-button>
            <u-button type="primary" text="提交" customStyle="margin-top: 30px" @click="submit"></u-button>
            <u-button type="error" text="重置" customStyle="margin-top: 20px; margin-bottom: 30px"
                @click="reset"></u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            guardian_picker: false,
            fileList1: [],
            disabled1: false,
            tips: '',
            value: '',
            showCalendar: false,
            showBirthday: false,
            model1: {
                userInfo: {
                    name: '',
                    gender: '',
                },
                symptoms: '',
                temperature: '',
                allergic: '',
                guardianInfo: {
                    name: '',
                    relation: '',
                    ID: '',
                    phone: '',
                }
            },
            showSex: false,
            birthday: Number(new Date()),
            guardian_list: [
                {
                name: '父亲',
                },
                {
                name: '母亲',
                },
                {
                name: '爷爷',
                },
                {
                name: '奶奶',
                },
                {
                name: '亲戚',
                },
                {
                name: '其他',
                }
            ],
            rules: {
                'userInfo.name': [
                    {
                    type: 'string',
                    required: true,
                    message: '请填写姓名',
                    trigger: ['blur', 'change'
                        ]
                    },
                    {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.chinese(value);
                        },
                    message: "姓名必须为中文",
                    trigger: [
                            "change",
                            "blur"
                        ],
                    }
                ],
                'userInfo.gender': {
                    type: 'string',
                    max: 1,
                    required: true,
                    message: '请选择男或女',
                    trigger: ['blur', 'change'
                    ]
                },
                'temperature': [
                    {
                    type: 'string',
                    required: true,
                    message: '请输入患者体温',
                    trigger: ['blur', 'change'
                        ]
                    },
                    {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.number(value);
                        },
                    message: "姓名必须为中文",
                    trigger: [
                            "change",
                            "blur"
                        ],
                    }
                ],
                'symptoms': {
                    type: 'string',
                    required: true,
                    message: '请填写症状',
                    trigger: ['blur', 'change'
                    ]
                },
                'guardianInfo.name': [
                    {
                    type: 'string',
                    required: true,
                    message: '请填写姓名',
                    trigger: ['blur', 'change'
                        ]
                    },
                    {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.chinese(value);
                        },
                    message: "姓名必须为中文",
                    trigger: [
                            "change",
                            "blur"
                        ],
                    }
                ],
                'guardianInfo.ID': [
                    {
                    type: 'string',
                    required: true,
                    message: '身份证号码不能为空',
                    trigger: ['blur', 'change'
                        ]
                    },
                    {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.idCard(value);
                        },
                    message: "请输入有效身份证号码",
                    trigger: [
                            "change",
                            "blur"
                        ],
                    }
                ],
                'guardianInfo.phone': [
                    {
                    type: 'string',
                    required: true,
                    message: '请输入联系电话号码',
                    trigger: ['blur', 'change'
                        ]
                    },
                    {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.mobile(value);
                        },
                    message: "请输入有效的联系电话号码",
                    trigger: [
                            "change",
                            "blur"
                        ],
                    }
                ],
            },
            genderlist: [
                {
                name: '男',
                disabled: false
                },
                {
                name: '女',
                disabled: false
                }
            ],
        }
    },
    onReady() {
        // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
        this.$refs.form1.setRules(this.rules)
    },
    methods: {
        afterRead(event) {
            this.fileList1.push({
                url: event.file,
                status: 'uploading',
                message: '上传中'
            })
        },
        navigateBack() {
            uni.navigateBack()
        },
        sexSelect(e) {
            this.model1.userInfo.sex = e.name
            this.$refs.form1.validateField('userInfo.sex')
        },
        change(e) {
            // console.log('change', e);
        },
        submit() {
            // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
            this.$refs.form1.validate().then(res => {
                uni.$u.toast('校验通过')
            }).catch(errors => {
                uni.$u.toast('校验失败')
            })
        },
        reset() {
            const validateList = ['userInfo.name', 'userInfo.gender', 'temperature', 'symptoms', 'allergic',
                'guardianInfo.name', 'guardianInfo.relation', 'guardianInfo.ID',
                'guardianInfo.phone'
            ]
            this.$refs.form1.resetFields()
            this.$refs.form1.clearValidate()
            setTimeout(() => {
                this.$refs.form1.clearValidate(validateList)
                // 或者使用 this.$refs.form1.clearValidate()
            },
            10)
        },
        hideKeyboard() {
            uni.hideKeyboard()
        },
        guardianRelation_select(e) {
            this.model1.guardianInfo.relation = e.name
            this.$refs.form1.validateField('guardianInfo.relation')
        }
    },
}
</script>

<style lang="scss">
.content {
    min-height: 100%;
}

.form-content {
    margin-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
}

.bottom-button {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    padding-bottom: 10px
}
</style>
