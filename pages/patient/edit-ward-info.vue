<template>
    <view class="content">
        <view class="form">
            <view class="form-content">
                <u--form labelPosition="left" :model="editpatrol1" ref="form1">
                    <u-form-item label="患者" label-width="120" prop="patientId" ref="item1">
                        <u--input v-model="editpatrol1.patientId" disabled disabledColor="#ffffff"
                            placeholder="患者ID"></u--input>
                    </u-form-item>
                    <u-form-item label="护士/医生" label-width="120" prop="nurseId" ref="item2">
                        <u--input v-model="editpatrol1.nurseId" disabled disabledColor="#ffffff"
                            aplaceholder="同班医生/护士"></u--input>
                    </u-form-item>
                    <u-form-item label="巡房时间" label-width="120" prop="time" ref="item3"
                        @click="time_picker = true; hideKeyboard()" borderBottom>
                        <u--input v-model="editpatrol1.time" placeholder="时间" disabled disabledColor="#ffffff">
                        </u--input>
                    </u-form-item>
                    <u-form-item label="患者状态/隐患" label-width="120" prop="info" ref="item5">
                        <u--textarea v-model="editpatrol1.info" placeholder="隐患">
                        </u--textarea>
                    </u-form-item>
                </u--form>
                <u-datetime-picker ref="datetimePicker" :show="time_picker" v-model="post.time" mode="datetime"
                    closeOnClickOverlay @close="time_picker = false" @cancel="time_picker = false"
                    @confirm='time_select' @change='change' :formatter="formatter">
                </u-datetime-picker>
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
import {
    dateTimeStr
} from "../../common/js/common";
export default {
    data() {
        return {
            check_id: '',
            time_picker: false,
            editpatrol1: {
                patientId: '',
                nurseId: '',
                info: '',
                time: '',
            },
            post: {
                nurseId: '',
                patientId: '',
                info: '',
                time: '',
            },
            rules: {
                'patientId': {
                    type: 'string',
                    required: true,
                    message: '请填写患者ID',
                    trigger: ['blur', 'change']
                },
                'nurseId': {
                    type: 'string',
                    required: true,
                    message: '请填写护士ID',
                    trigger: ['blur', 'change']
                },
                'time': {
                    type: 'string',
                    required: true,
                    message: '请填写时间',
                    trigger: ['blur', 'change']
                }
            },
        }
    },
    onLoad(options) {
        this.$request.checkLogin()
        var time = common.loadSystemTime()
        this.post.time = time[0]
        this.editpatrol1.time = time[1]
        this.editpatrol1.nurseId = String(this.$db.get('current_user').id)
        this.editpatrol1.patientId = options.id
        let check_info = this.$db.get('selected_check')
        this.editpatrol1.info = check_info.info
        this.check_id = check_info.id
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

        navigateBack() {
            uni.navigateBack()
        },
        submit() {
            let that = this
            that.$refs.form1.validate().then(res => {
                that.convertToForm()
                that.$request.editWard(this.check_id, this.post).then(res => {
                    if (res.statusCode !== 200) {
                        this.$.toast('提交失败');
                    } else {
                        uni.showToast({
                            title: "修改成功！",
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
                uni.$u.toast('校验失败')
            })
        },
        reset() {
            const validateList = ['patientId', 'nurseId', 'time']
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
            this.editpatrol1.time = dateTimeStr(Math.round(e.value / 1000))
            this.post.time = e.value
            this.time_picker = false
        },
        convertToForm() {
            this.post.nurseId = parseInt(this.editpatrol1.nurseId, 10)
            this.post.patientId = parseInt(this.editpatrol1.patientId, 10)
            this.post.info = this.editpatrol1.info
            this.post.time = Math.round(this.post.time / 1000)
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
