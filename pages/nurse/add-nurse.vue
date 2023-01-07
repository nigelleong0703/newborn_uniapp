<template>
  <view class="content">
    <view class="form">
      <view class="form-content">
        <u--form labelPosition="left" :model="form1" ref="form1">
          <view class="second-title">护士基本信息</view>
          <u-form-item label="姓名" label-width="120" prop="name" ref="item1">
            <u--input v-model="form1.name" placeholder="请输入护士姓名"></u--input>
          </u-form-item>
          <u-form-item label="性别" label-width="120" prop="gender" ref="item2">
            <u-radio-group v-model="form1.gender">
              <u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in genderlist" :key="index"
                :label="item.name" :name="item.name" @change='sexSelect(item.id)'>
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="身份证号" label-width="120" prop="guardianId" ref="item3">
            <u--input v-model="form1.nurseId" placeholder="请输入身份证号" type=' idcard'>
            </u--input>
          </u-form-item>
          <u-form-item label="联系电话" label-width="120" prop="tel" ref="item4">
            <u--input v-model="form1.tel" placeholder="请输入联系电话号码" type="tel"></u--input>
          </u-form-item>
          <u-form-item label="科室" label-width="120" prop="department" ref="item5"
            @click="department_picker = true; hideKeyboard()">
            <u--input v-model="form1.department" disabled disabledColor="#ffffff" placeholder="请选择科室" border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="入职日期" label-width="120" prop="registerdate" @click="time_picker = true; hideKeyboard()"
            ref="item6">
            <u--input v-model="form1.registerdate" placeholder="请输入护士入职日期" disabled disabledColor="#ffffff">
            </u--input>
          </u-form-item>
          <view class="second-title">登录信息</view>
          <u-form-item label="用户名" label-width="120" prop="username" ref="item7">
            <u--input v-model="form1.username" placeholder="请输入护士用户名"></u--input>
            </u--input>
          </u-form-item>
          <u-form-item label="密码" label-width="120" prop="password" ref="item8">
            <u--input v-model="form1.password" placeholder="请输入新的密码" type='password'></u--input>
          </u-form-item>
          <u-form-item label="密码验证" label-width="120" prop="password_verify" ref="item9">
            <u--input v-model="form1.password_verify" placeholder="请重新输入密码" type='password'></u--input>
          </u-form-item>
        </u--form>
        <u-action-sheet :show="department_picker" :actions="department_list" title="科室选择" description="请选择负责科室"
          closeOnClickOverlay @close="department_picker = false" @select='department_select'>
        </u-action-sheet>
        <u-datetime-picker v-model="post.registerdate" ref="datetimePicker" :show="time_picker" mode="date"
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
          username: '',
          password: '',
          name: '',
          tel: '',
          department: '',
          gender: '',
          password_verify: '',
          registerdate: '',
          nurseId: '',
        },
        post: {
          username: '',
          password: '',
          name: '',
          tel: '',
          department: '',
          gender: '',
          password_verify: '',
          registerdate: '',
          nurseId: '',
        },
        post1: {
          username: '',
          password: '',
          name: '',
          tel: '',
          department: '',
          gender: '',
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
          'registerdate': {
            type: 'string',
            required: true,
            message: '请输入患者生日日期',
            trigger: ['blur', 'change']
          },
          'nurseId': [{
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
      this.$request.checkLogin()
      this.department_list = common.getDepartment_list()
      var time = common.loadSystemTime()
      this.post.registerdate = time[0]
      this.form1.registerdate = time[1]
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
        this.post1.gender = e
        this.$refs.form1.validateField('gender')
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
          this.post1.tel = this.form1.tel
          this.post1.department = this.post.department
          // this.convertToForm();
          console.log(this.post1)
          this.$request.post('/api/nurse/add', this.post1).then(res => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$.toast(res.data.message);
            } else {
              uni.showToast({
                title: res.data.message,
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
          console.log(errors)
        })

      },
      reset() {
        const validateList = ['form1.username', 'form1.password', 'form1.name',
          'form1.tel', 'form1.department', 'form1.gender', 'form1.registerdate', 'form1.password_verify',
          'form1.nurseId',
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
      time_select(e) {
        var bd = Math.round(e.value / 1000)
        this.form1.registerdate = uni.$u.timeFormat(bd, 'yyyy-mm-dd')
        this.post.registerdate = bd
        this.time_picker = false
      },
      convertToForm() {
        Object.entries(this.post1).forEach((entry) => {
          const [key, value] = entry;
          console.log(key)
          console.log(this.post.key)
          this.post1.key = this.post.key
          console.log(this.post1.key)
        });
        console.log(this.post1)
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
