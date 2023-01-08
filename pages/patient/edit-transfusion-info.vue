<template>
    <view class="content">
        <view class="form">
            <view class="form-content">
                <u--form labelPosition="left" :model="transfusion1" ref="form1">
                    <view class="second-title">基本信息</view>
                    <u-form-item label="患者" label-width="120" prop="patientId" ref="item1">
                        <u--input v-model="transfusion1.patientId" disabled disabledColor="#ffffff"
                            placeholder="患者ID"></u--input>
                    </u-form-item>
                    <u-form-item label="护士/医生" label-width="120" prop="nurseId" ref="item2">
                        <u--input v-model="transfusion1.nurseId" disabled disabledColor="#ffffff"
                            placeholder="负责医生/护士"></u--input>
                    </u-form-item>
                    <u-form-item label="输液时间" label-width="120" prop="startTime" ref="item3"
                        @click="time_picker = true; hideKeyboard()" borderBottom>
                        <u--input v-model="transfusion1.startTime_display" placeholder="时间" disabled
                            disabledColor="#ffffff">
                        </u--input>
                    </u-form-item>
                    <view class="second-title">基本输液信息</view>
                    <u-form-item label="输液名称" label-width="120" prop="name" ref="item4">
                        <u--input v-model="transfusion1.name" placeholder="输液名称"></u--input>
                    </u-form-item>
                    <u-form-item prop="vein" ref="item5" @click="vein_picker = true; hideKeyboard()" borderBottom>
                        <u--input v-model="transfusion1.vein" disabled disabledColor="#ffffff" placeholder="静脉选择"
                            border="none">
                        </u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                    <u-form-item prop="tool" ref="item6" @click="tool_picker = true; hideKeyboard()" borderBottom>
                        <u--input v-model="transfusion1.tool" disabled disabledColor="#ffffff" placeholder="输液工具选择"
                            border="none">
                        </u--input>
                        <u-icon slot="right" name="arrow-right"></u-icon>
                    </u-form-item>
                </u--form>
                <u-datetime-picker ref="datetimePicker" :show="time_picker" mode="datetime" v-model="post1.startTime"
                    closeOnClickOverlay @close="time_picker = false" @cancel="time_picker = false"
                    @confirm='time_select' @change='change' :formatter="formatter">
                </u-datetime-picker>
                <u-action-sheet :show="vein_picker" :actions="vein_list" title="静脉选择" closeOnClickOverlay
                    @close="vein_picker = false" @select='vein_select'>
                </u-action-sheet>
                <u-action-sheet :show="tool_picker" :actions="tool_list" title="输液工具选择" closeOnClickOverlay
                    @close="tool_picker = false" @select='tool_select'>
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
        return {
            transfusion_id: '',
            time_picker: false,
            vein_picker: false,
            tool_picker: false,
            count: 1,
            current_drug: 0,
            unixtime: '',
            transfusion1: {
                name: '',
                patientId: '',
                nurseId: '',
                startTime_display: '',
                vein: '',
                tool: '',
            },
            post1: {
                name: '',
                patientId: '',
                nurseId: '',
                startTime: '',
                vein: '',
                tool: '',
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
                },
                'vein': {
                    required: true,
                    message: '请选择输液工具',
                    trigger: ['blur', 'change']
                },
                'tool': {
                    required: true,
                    message: '请选择静脉',
                    trigger: ['blur', 'change']
                },
            },
            vein_list: [],
            tool_list: [],
        }
    },
    onLoad(options) {
        this.$request.checkLogin()
        var time = common.loadSystemTime()
        this.post1.startTime = time[0]
        this.transfusion1.startTime_display = time[1]
        this.transfusion1.nurseId = String(this.$db.get('current_user').id)
        this.transfusion1.patientId = options.id
        this.getVein_list()
        this.getTool_list()
        let transfusion_info = this.$db.get('selected_transfusion')
        this.transfusion_id = transfusion_info.id
        this.transfusion1.name = transfusion_info.name
        this.$request.getVeinList().then(res => {
            this.transfusion1.vein = res.data[(transfusion_info.vein) - 1].name;
        })
        this.$request.getToolList().then(res => {
            this.transfusion1.tool = res.data[(transfusion_info.tool) - 1].name;
        })
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
                that.$request.editTransfusion(this.transfusion_id, this.post1).then(res => {
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
            const validateList = []
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
        vein_select(e) {
            this.transfusion1.vein = e.name
            this.post1.vein = e.id
        },
        tool_select(e) {
            this.transfusion1.tool = e.name
            this.post1.tool = e.id
        },
        time_select(e) {
            this.transfusion1.startTime_display = common.dateTimeStr(Math.round(e.value / 1000))
            this.post1.startTime = e.value
            this.time_picker = false
        },
        getVein_list() {
            this.$request.getVeinList().then(res => {
                this.vein_list = res.data;
            })
        },
        getTool_list() {
            this.$request.getToolList().then(res => {
                this.tool_list = res.data;
            })
        },
        deleteButton() {
            if (this.count < 2) {
                return true
            } else return false
        },
        convertToForm() {
            this.post1.nurseId = parseInt(this.transfusion1.nurseId, 10);
            this.post1.patientId = parseInt(this.transfusion1.patientId, 10)
            this.post1.startTime = Math.round(this.post1.startTime / 1000)
            if (this.transfusion1.name == '') {
                this.transfusion1.name = this.transfusion1.drug[0].drug;
                this.post1.name = this.transfusion1.drug[0].drug;
            } else {
                this.post1.name = this.transfusion1.name;
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
    margin-left: 10%;
    margin-right: 10%;
}


.drug-button {
    width: 50%;
    margin-top: 20px;
    margin-left: 25%;
    margin-right: 25%;
}

#drug {
    margin-top: 10px;
    margin-bottom: 10px;
}

.add-button u-button {
    margin-top: 10px;
    margin-bottom: 10px;
}

.bottom-button {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    padding-bottom: 10px
}

.second-title {
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
}
</style>
