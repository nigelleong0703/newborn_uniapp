<template>
  <view class="content">
    <view class="form">
      <view class="form-content">
        <u--form labelPosition="left" :model="form1" ref="form1">
          <view class="second-title">患者基本信息</view>
          <u-form-item label="姓名" label-width="120" prop="name" ref="item1">
            <u--input v-model="form1.name" placeholder="请输入患者姓名"></u--input>
          </u-form-item>
          <u-form-item label="性别" label-width="120" prop="gender" ref="item2">
            <u-radio-group v-model="form1.gender">
              <u-radio :customStyle="{ marginRight: '16px' }" v-for="(item, index) in genderlist" :key="item.id"
                :label="item.name" :name="item.name" @change='sexSelect(item.id)'>
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="生日日期" label-width="120" prop="birthdate" @click="time_picker = true; hideKeyboard()"
            ref="item3">
            <u--input v-model="form1.birthdate" placeholder="请输入患者生日日期" disabled disabledColor="#ffffff">
            </u--input>
          </u-form-item>
          <view class="second-title">监护人信息</view>
          <u-form-item label="监护人姓名" label-width="120" prop="guardian" ref="item4">
            <u--input v-model="form1.guardian" placeholder="请输入监护人姓名"></u--input>
            </u--input>
          </u-form-item>
          <u-form-item label="监护人身份证号" label-width="120" prop="guardianId" ref="item5">
            <u--input v-model="form1.guardianId" placeholder="请输入身份证号" type='idcard'></u--input>
          </u-form-item>
          <u-form-item label="监护人关系" label-width="120" prop="relation" ref="item6"
            @click="guardian_picker = true; hideKeyboard()">
            <u--input v-model="form1.relation" disabled disabledColor="#ffffff" placeholder="请选择监护人关系" border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="联系电话" label-width="120" prop="tel" ref="item7">
            <u--input v-model="form1.tel" placeholder="请输入监护人联系电话号码" type="tel"></u--input>
          </u-form-item>
          <view class="second-title">入院信息</view>
          <u-form-item label="科室" label-width="120" prop="department" ref="item8"
            @click="department_picker = true; hideKeyboard()">
            <u--input v-model="form1.department" disabled disabledColor="#ffffff" placeholder="请选择科室" border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="房号" label-width="120" prop="room" ref="item10">
            <u--input placeholder="请输入房号" v-model="form1.room"></u--input>
          </u-form-item>
          <u-form-item label="床号" label-width="120" prop="bed" ref="item11">
            <u--input placeholder="请输入床号" v-model="form1.bed"></u--input>
          </u-form-item>
          <u-form-item label="过敏信息" label-width="120" prop="allergy" ref="item9">
            <u--textarea placeholder="请填写过敏信息" v-model="form1.allergy" count></u--textarea>
          </u-form-item>
        </u--form>
        <u-action-sheet :show="guardian_picker" :actions="guardian_list" title="监护人关系" description="请选择监护人与患者关系"
          closeOnClickOverlay @close="guardian_picker = false" @select='relation_select'>
        </u-action-sheet>
        <u-action-sheet :show="department_picker" :actions="department_list" title="科室选择" description="请选择负责科室"
          closeOnClickOverlay @close="department_picker = false" @select='department_select'>
        </u-action-sheet>
        <u-datetime-picker ref="datetimePicker" :show="time_picker" mode="date" closeOnClickOverlay
          @close="time_picker = false" @cancel="time_picker = false" @confirm='time_select' @change='change'
          :formatter="formatter">
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
export default {
  data() {
    return {
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
      guardian_picker: false,
      department_picker: false,
      time_picker: false,
      showSex: false,
      form1: {
        name: '',
        gender: '',
        birthdate: '',

        guardian: '',
        guardianId: '',
        relation: '',
        tel: '',

        department: '',
        room: '',
        bed: '',
        allergy: ''
      },
      post: {
        name: '',
        gender: '',
        birthdate: '',

        guardian: '',
        guardianId: '',
        relation: '',
        tel: '',

        department: '',
        room: '',
        bed: '',
        allergy: ''
      },
      birthday: Number(new Date()),
      guardian_list: [{
        id: 1,
        name: '父亲',
      }, {
        id: 2,
        name: '母亲',
      }, {
        id: 3,
        name: '爷爷',
      }, {
        id: 4,
        name: '奶奶',
      }, {
        id: 5,
        name: '亲戚',
      }, {
        id: 6,
        name: '其他',
      }],
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
        'gender': {
          type: 'string',
          min: 1,
          max: 2,
          required: true,
          message: '请选择男或女',
          trigger: ['blur', 'change']
        },
        'birthdate': {
          type: 'string',
          required: true,
          message: '请输入患者生日日期',
          trigger: ['blur', 'change']
        },
        'guardian': [{
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
        'guardianId': [{
          type: 'string',
          required: true,
          message: '身份证号码不能为空',
          trigger: ['blur', 'change']
        }, {
          validator: (rule, value, callback) => {
            return uni.$u.test.idCard(value);
          },
          message: "请输入有效身份证号码",
          trigger: ["change", "blur"],
        }],
        'relation': {
          type: 'string',
          required: true,
          message: '请选择监护人关系',
          trigger: ['blur', 'change']
        },
        'tel': [{
          type: 'string',
          required: true,
          message: '请输入联系电话号码',
          trigger: ['blur', 'change']
        }, {
          validator: (rule, value, callback) => {
            return uni.$u.test.mobile(value);
          },
          message: "请输入有效的联系电话号码",
          trigger: ["change", "blur"],
        }],
        'department': [{
          type: 'string',
          required: true,
          message: '请选择科室',
          trigger: ['blur', 'change']
        }],
        'room': [{
          type: 'string',
          required: true,
          message: '请输入房号',
          trigger: ['blur', 'change']
        }],
        'bed': [{
          type: 'string',
          required: true,
          message: '请输入床号',
          trigger: ['blur', 'change']
        }],
      },
      genderlist: [{
        id: 1,
        name: '男',
        disabled: false
      },
      {
        id: 2,
        name: '女',
        disabled: false
      }
      ],
    }
  },
  onLoad(option) {
    this.department_list = common.getDepartment_list()
    if (option.department) {
      let passedDepartment = option.department
      this.form1.department = this.department_list[passedDepartment - 1].name
      this.post.department = passedDepartment
    }
  },
  onReady() {
    this.$refs.datetimePicker.setFormatter(this.formatter)
    this.$refs.form1.setRules(this.rules)
  },
  methods: {
    navigateBack() {
      uni.navigateBack()
    },
    sexSelect(e) {
      console.log(e)
      this.form1.gender = e
      this.post.gender = e
      this.$refs.form1.validateField('gender')
    },
    change(e) {
      // console.log('change', e);
    },
    submit() {
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.form1.validate().then(res => {
        this.post.name = this.form1.name
        this.post.guardian = this.form1.guardian
        this.post.guardianId = this.form1.guardianId
        this.post.tel = this.form1.tel
        this.post.room = this.form1.room
        this.post.bed = this.form1.bed
        this.post.allergy = this.form1.allergy
        console.log(this.post)
        this.$request.post('/api/patient/add', this.post).then(res => {
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
                  uni.$emit('addNewPatient', {
                    department: this.post.department
                  })
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
      const validateList = ['form1.name', 'form1.gender', 'form1.birthdate',
        'form1.guardian', 'form1.guardianId', 'form1.relation', 'form1.tel', 'form1.department', 'form1.allergy',
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
    relation_select(e) {
      this.post.relation = e.id
      this.form1.relation = e.name
    },
    department_select(e) {
      this.form1.department = e.name
      this.post.department = e.id
    },
    time_select(e) {
      var bd = Math.round(e.value / 1000)
      this.form1.birthdate = uni.$u.timeFormat(bd, 'yyyy-mm-dd')
      this.post.birthdate = bd
      this.time_picker = false
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
