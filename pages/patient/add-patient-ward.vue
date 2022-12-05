<template>
    <view class="content">
        <view class="form">
            <view class="form-content">
                <u--form labelPosition="left" :model="patrol1" ref="form1">
                    <u-form-item prop="patientInfo.bed" ref="item1">
                        <u--input v-model="patrol1.patientInfo.bed" placeholder="床号"></u--input>
                    </u-form-item>
                    <u-form-item prop="ward.time" ref="item2" @click="time_picker = true; hideKeyboard()" borderBottom>
                        <u--input v-model="patrol1.ward.time_display" placeholder="时间" disabled disabledColor="#ffffff">
                        </u--input>
                    </u-form-item>
                    <u-form-item prop="ward.nurse_doctor_info" ref="item3">
                        <u--input v-model="patrol1.ward.nurse_doctor_info" placeholder="同班医生/护士"></u--input>
                    </u-form-item>
                    <u-form-item prop="ward.info" ref="item4">
                        <u--textarea v-model="patrol1.ward.info" placeholder="隐患">
                        </u--textarea>
                    </u-form-item>
                </u--form>
                <u-datetime-picker :show="time_picker" mode="datetime" v-model="patrol1.ward.time" closeOnClickOverlay
                    @close="time_picker = false" @cancel="time_picker = false" @confirm='time_select' @change='change'
                    :formatter="formatter">
                </u-datetime-picker>
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
import common from "common/js/common.js"
export default {
    data() {
        return {
            time_picker: false,
            patrol1: {
                patientInfo: {
                    name: '',
                    bed: '',
                },
                ward: {
                    time: '',
                    nurse_doctor_info: '',
                    nurseInfo: {
                        name: '',
                        ID: '',
                    },
                    doctorInfo: {
                        name: '',
                        ID: '',
                    },
                    info: '',
                }
            },
            form: {
                nurseId: '',
                patientId: '',
                transfusionId: '',
                info: '',
            },
            rules: {
                'patientInfo.bed': [{
                    type: 'string',
                    required: true,
                    message: '请填写床号',
                    trigger: ['blur', 'change']
                }, {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.chinese(value);
                    },

                    //////这里需要修改
                    message: "床号格式不正确",
                    trigger: ["change", "blur"],
                }],
                'ward.time': [{
                    type: 'string',
                    required: true,
                    message: '请填写巡房时间',
                    trigger: ['blur', 'change']
                }, {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.date(value);
                    },
                    message: "床号格式不正确",
                    trigger: ["change", "blur"],
                }],
            },
        }
    },
    onLoad(options) {
        common.loadSystemTime(this.patrol1.ward)
    },
    onReady() {
        this.$refs.datetimePicker.setFormatter(this.formatter)
        this.$refs.form1.setRules(this.rules)
    },
    methods: {
        formatter(type, value) {
            if (type == 'year') {
                return `${value}年`
            }
            if (type == 'month') {
                return `${value}月`
            }
            if (type == 'day') {
                return `${value}日`
            }
            if (type == 'hour') {
                return `${value}时`
            }
            if (type == 'minute') {
                return `${value}分`
            }
            return value
        },

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
        submit() {
            this.$refs.form1.validate().then(res => {
                uni.$u.toast('校验通过')
                this.convertToForm()
                uni.request({
                    url: "http://43.138.3.76:8000/api/check/add",
                    method: "POST",
                    data: this.form,
                    success: (res) => {
                        const data = res.data
                        if (data.code !== '200') {
                            uni.$u.toast('提交失败')
                        } else {
                            uni.$u.toast('提交成功')
                            uni.navigateBack()
                        }
                    }
                })
            }).catch(errors => {
                uni.$u.toast('校验失败')
            })
        },
        reset() {
            const validateList = ['patientInfo.bed', 'ward.time', 'ward.nurse_doctor_info', 'ward.info']
            this.$refs.form1.resetFields()
            this.$refs.form1.clearValidate()
            setTimeout(() => {
                this.$refs.form1.clearValidate(validateList)
            }, 10)
        },
        change(e) {
            // console.log('change', e)
        },
        hideKeyboard() {
            uni.hideKeyboard()
        },
        time_select(e) {
            common.time_select1(this, this.patrol1.ward, e.value)
        },
        convertToForm() {
            this.form.nurseId = this.patrol1.ward.nurse_doctor_info
            this.form.patientId = this.patientInfo.bed
            this.form.transfusionId = ''
            this.form.info = this.patrol1.info
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
