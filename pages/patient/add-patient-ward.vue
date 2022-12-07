<template>
  <view class="content">
    <view class="form">
      <view class="form-content">
        <u--form labelPosition="left" :model="patrol1" ref="form1">
          <u-form-item label="患者" label-width="120" prop="patientId" ref="item1">
            <u--input v-model="patrol1.patientId" disabled disabledColor="#ffffff" placeholder="患者ID"></u--input>
          </u-form-item>
          <u-form-item label="护士/医生" label-width="120" prop="nurseId" ref="item2">
            <u--input v-model="patrol1.nurseId" disabled disabledColor="#ffffff" aplaceholder="同班医生/护士"></u--input>
          </u-form-item>
          <u-form-item label="巡房时间" label-width="120" prop="time" ref="item3"
            @click="time_picker = true; hideKeyboard()" borderBottom>
            <u--input v-model="patrol1.time" placeholder="时间" disabled disabledColor="#ffffff">
            </u--input>
          </u-form-item>
          <u-form-item label="输液ID" label-width="120" prop="transfusionId" ref="item4">
            <u--input v-model="patrol1.transfusionId" placeholder="输液ID"></u--input>
          </u-form-item>
          <u-form-item label="患者状态/隐患" label-width="120" prop="info" ref="item5">
            <u--textarea v-model="patrol1.info" placeholder="隐患">
            </u--textarea>
          </u-form-item>
        </u--form>
        <u-datetime-picker ref="datetimePicker" :show="time_picker" v-model="post.time" mode="datetime"
          closeOnClickOverlay @close="time_picker = false" @cancel="time_picker = false" @confirm='time_select'
          @change='change' :formatter="formatter">
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
        time_picker: false,
        patrol1: {
          patientId: '',
          nurseId: '',
          transfusionId: '',
          info: '',
          time: '',
        },
        post: {
          nurseId: '',
          patientId: '',
          transfusionId: '',
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
      var time = common.loadSystemTime()
      this.post.time = time[0]
      this.patrol1.time = time[1]
      this.patrol1.nurseId = String(uni.getStorageSync('current_user').id)
      this.patrol1.patientId = options.id
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
          this.$request.post('/api/check/add', this.post).then(res => {
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
        this.patrol1.time = dateTimeStr(Math.round(e.value / 1000))
        this.post.time = e.value
        this.time_picker = false
      },
      convertToForm() {
        this.post.nurseId = this.patrol1.nurseId
        this.post.patientId = this.patrol1.patientId
        this.post.transfusionId = ''
        this.post.info = this.patrol1.info
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
