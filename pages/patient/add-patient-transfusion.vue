<template>
  <view class="content">
    <view class="form">
      <view class="form-content">
        <u--form labelPosition="left" :model="transfusion1" ref="form1">
          <u-form-item prop="patientInfo.bed" ref="item1">
            <u--input v-model="transfusion1.patientInfo.bed" placeholder="床号"></u--input>
          </u-form-item>
          <u-form-item prop="ward.time" ref="item2" @click="time_picker = true; hideKeyboard()" borderBottom>
            <u--input v-model="transfusion1.ward.time_display" placeholder="时间" disabled disabledColor="#ffffff">
            </u--input>
          </u-form-item>
          <u-form-item prop="ward.nurse_doctor_info" ref="item3">
            <u--input v-model="transfusion1.ward.nurse_doctor_info" placeholder="负责医生/护士"></u--input>
          </u-form-item>
          <u-form-item prop="vein" ref="item4" @click="vein_picker = true; hideKeyboard()" borderBottom>
            <u--input v-model="transfusion1.vein" disabled disabledColor="#ffffff" placeholder="静脉选择" border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item prop="tool" ref="item5" @click="tool_picker = true; hideKeyboard()" borderBottom>
            <u--input v-model="transfusion1.tool" disabled disabledColor="#ffffff" placeholder="输液工具选择" border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item prop="drug.drug" ref="item6" @click="drug_picker = true; hideKeyboard()" borderBottom>
            <u--input v-model="transfusion1.drug.drug" disabled disabledColor="#ffffff" placeholder="药物选择"
              border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item prop="drug.seq" ref="item7" borderBottom> 输液剂数
            <u-number-box v-model="transfusion1.drug.seq" @change='seq_picker' integer step="1" :min="1" slot="right">
            </u-number-box>
          </u-form-item>
          <u-form-item prop="drug.rate" ref="item8">
            <u--input v-model="transfusion1.drug.rate" placeholder="输液速度"></u--input>
          </u-form-item>
          <u-form-item prop="drug.dose" ref="item9">
            <u--input v-model="transfusion1.drug.dose" placeholder="输液量"></u--input>
          </u-form-item>
        </u--form>
        <u-datetime-picker :show="time_picker" mode="datetime" v-model="transfusion1.ward.time" closeOnClickOverlay
          @close="time_picker = false" @cancel="time_picker = false" @confirm='time_select' @change='change'
          :formatter="formatter">
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
    <view class=bottom-button>
      <u-button type="primary" text="提交" customStyle="margin-top: 30px" @click="submit"></u-button>
      <u-button type="error" text="重置" customStyle="margin-top: 20px; margin-bottom: 30px" @click="reset"></u-button>
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
        transfusion1: {
          patientInfo: {
            name: '',
            bed: '',
          },
          ward: {
            time: '',
            time_display: '',
            nurse_doctor_info: '',
          },
          vein: '',
          tool: '',
          drug: {
            rate: '',
            dose: '',
            drug: '',
            seq: '',
          }
        },
        form: {
          nurseId: '',
          patientId: '',
          startTime: '',
          name: '',
          vein: '',
          tool: '',
          drug: {
            drug: '',
            seq: '',
            dose: '',
            rate: '',
          }
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
            message: "床号格式不正确",
            trigger: ["change", "blur"],
          }],
          'drug.rate': [{
            type: 'string',
            required: true,
            message: '请填写输液速度',
            trigger: ['blur', 'change']
          }, {
            validator: (rule, value, callback) => {
              return uni.$u.test.number(value);
            },
            message: "输液速度格式不正确",
            trigger: ["change", "blur"],
          }],
          'drug.dose': [{
            type: 'string',
            required: true,
            message: '请填写输液量',
            trigger: ['blur', 'change']
          }, {
            validator: (rule, value, callback) => {
              return uni.$u.test.number(value);
            },
            message: "输液量格式不正确",
            trigger: ["change", "blur"],
          }],
        },
        vein_list: [],
        tool_list: [],
        drug_list: [],
      }
    },
    onLoad(options) {
      common.loadSystemTime(this.transfusion1.ward)

      this.getVein_list()
      this.getTool_list()
      this.getDrug_list()
    },
    onReady() {
      // this.$refs.datetimePicker.setFormatter(this.formatter)
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
        // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
        this.$refs.form1.validate().then(res => {
          uni.$u.toast('校验通过')
        }).catch(errors => {
          uni.$u.toast('校验失败')
        })
      },
      reset() {
        const validateList = ['patientInfo.bed', 'ward.time', 'ward.nurse_doctor_info', 'vein', 'tool', 'drug.rate',
          'drug.dose', 'drug.drug', 'durg.seq'
        ]
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
        this.form.vein = e.id
      },
      tool_select(e) {
        this.transfusion1.tool = e.name
        this.form.tool = e.id
      },
      drug_select(e) {
        this.transfusion1.drug.drug = e.name
        this.form.drug.drug = e.id
      },
      time_select(e) {
        var unixtime = common.time_select1(this, this.transfusion1.ward, e.value)
        this.form.startTime = unixtime
      },
      seq_picker(e) {
        this.transfusion1.druq.seq = e
        this.form.druq.seq = e
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
