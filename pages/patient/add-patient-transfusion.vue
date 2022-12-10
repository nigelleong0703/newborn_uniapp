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
                    <view v-for="(drug, index) in transfusion1.drug" :key="drug.seq">
                        <view class="second-title">药物{{ drug.seq }}</view>
                        <u-form-item :prop="'drug.' + index.toString() + '.drug'"
                            @click="drug_picker = true; current_drug = index, hideKeyboard()" borderBottom>
                            <u--input v-model="transfusion1.drug[index].drug" disabled disabledColor="#ffffff"
                                placeholder="药物选择" border="none">
                            </u--input>
                            <u-icon slot="right" name="arrow-right"></u-icon>
                        </u-form-item>
                        <u-form-item label="输液速度" label-width="120" :prop="'drug.' + index.toString() + '.rate'">
                            <u--input v-model="drug.rate" placeholder="输液速度"></u--input>
                        </u-form-item>
                        <u-form-item label="输液量" label-width="120" :prop="'drug.' + index.toString() + '.dose'">
                            <u--input v-model="drug.dose" placeholder="输液量"></u--input>
                        </u-form-item>
                    </view>
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
                <u-action-sheet :show="drug_picker" :actions="drug_list" title="药物选择" closeOnClickOverlay
                    @close="drug_picker = false" @select='drug_select'>
                </u-action-sheet>
            </view>
        </view>
        <view class=drug-button>
            <u-button id="drug" type="info" shape="circle" text="增加药物" @click="addDrug()"></u-button>
            <u-button id="drug" type="info" shape="circle" text="减少药物" :disabled="deleteButton()" @click="deleteDrug()">
            </u-button>
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
            time_picker: false,
            vein_picker: false,
            tool_picker: false,
            drug_picker: false,
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
                drug: [],
            },
            post1: {
                name: '',
                patientId: '',
                nurseId: '',
                startTime: '',
                vein: '',
                tool: '',
                drug: [],
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
            drug_list: [],
        }
    },
    onLoad(options) {
        var time = common.loadSystemTime()
        this.post1.startTime = time[0]
        this.transfusion1.startTime_display = time[1]
        this.transfusion1.nurseId = String(uni.getStorageSync('current_user').id)
        this.transfusion1.patientId = options.id
        this.getVein_list()
        this.getTool_list()
        this.getDrug_list()
        this.addDrugObject()
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
            this.$refs.form1.validate().then(res => {
                this.convertToForm()
                this.$request.post('/api/transfusion/add', this.post1).then(res => {
                    console.log(res)
                    if (res.statusCode !== 200) {
                        this.$.toast('提交失败');
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
        drug_select(e) {
            this.transfusion1.drug[this.current_drug].drug = e.name
            this.post1.drug[this.current_drug].drug = e.id
        },
        time_select(e) {
            this.transfusion1.startTime_display = common.dateTimeStr(Math.round(e.value / 1000))
            this.post1.startTime = e.value
            this.time_picker = false
        },
        seq_picker(e) {
            this.transfusion1.druq.seq = e
            this.post1.druq.seq = e
            this.$refs.form1.validateField('drug.seq')
        },
        getVein_list() {
            this.$request.get('/api/list/vein').then(res => {
                console.log(res)
                this.vein_list = res.data;
            })
        },
        getTool_list() {
            this.$request.get('/api/list/tool').then(res => {
                console.log(res)
                this.tool_list = res.data;
            })
        },
        getDrug_list() {
            this.$request.get('/api/list/drug').then(res => {
                console.log(res)
                this.drug_list = res.data;
            })
        },
        deleteButton() {
            if (this.count < 2) {
                return true
            } else return false
        },
        convertToForm() {
            this.post1.nurseId = this.transfusion1.nurseId
            this.post1.patientId = this.transfusion1.patientId
            this.post1.startTime = Math.round(this.post1.startTime / 1000)
            if (this.transfusion1.name == '') {
                console.log('true')
                this.transfusion1.name = this.transfusion1.drug[0].drug;
                this.post1.name = this.transfusion1.drug[0].drug;
            } else {
                console.log('false')
                this.post1.name = this.transfusion1.name;
            }
            for (let i = 0; i < this.count; i++) {
                this.post1.drug[i].rate = this.transfusion1.drug[i].rate
                this.post1.drug[i].dose = this.transfusion1.drug[i].dose
            }
        },
        addDrugObject() {
            let newDrug = {
                rate: '',
                dose: '',
                drug: '',
                seq: this.count,
            }
            let newDrug2 = {
                rate: '',
                dose: '',
                drug: '',
                seq: this.count,
            }
            this.transfusion1.drug.push(newDrug2)
            this.post1.drug.push(newDrug)
            this.rules['drug.' + (this.count - 1).toString() + '.drug'] = {
                required: true,
                message: '请选择药物',
                trigger: ["change", "blur"]
            }
            this.rules['drug.' + (this.count - 1).toString() + '.rate'] = [{
                required: true,
                message: '请输入输液速度',
                trigger: ["change", "blur"]
            }, {
                validator: (rule, value, callback) => {
                    return uni.$u.test.number(value);
                },
                message: "只能输入数字",
                trigger: ["change", "blur"],
            }]
            this.rules['drug.' + (this.count - 1).toString() + '.dose'] = [{
                required: true,
                message: '请输入输液量',
                trigger: ["change", "blur"]
            }, {
                validator: (rule, value, callback) => {
                    return uni.$u.test.number(value);
                },
                message: "只能输入数字",
                trigger: ["change", "blur"],
            }]

        },
        deleteDrugObject() {
            this.transfusion1.drug.pop();
            this.post1.drug.pop()
            delete this.rules['drug.' + (this.count - 1).toString() + '.drug']
            delete this.rules['drug.' + (this.count - 1).toString() + '.dose']
            delete this.rules['drug.' + (this.count - 1).toString() + '.rate']
        },
        addDrug() {
            this.count++;
            this.addDrugObject()
        },
        deleteDrug() {
            this.deleteDrugObject()
            this.count--;
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
