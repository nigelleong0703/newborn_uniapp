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
          <u-form-item label="联系电话" label-width="120" prop="tel" ref="item4">
            <u--input v-model="form1.tel" placeholder="请输入联系电话号码" type="tel"></u--input>
          </u-form-item>
          <u-form-item label="科室" label-width="120" prop="department" ref="item5"
            @click="department_picker = true; hideKeyboard()">
            <u--input v-model="form1.department" disabled disabledColor="#ffffff" placeholder="请选择科室" border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <view class="second-title">登录信息</view>
          <u-form-item label="用户名" label-width="120" prop="username" ref="item7">
            <u--input v-model="form1.username" placeholder="请输入护士用户名"></u--input>
          </u-form-item>
          <u-form-item label="密码" label-width="120" prop="password" ref="item8">
            <u--input v-model="form1.password" placeholder="请输入新的密码" type='password'></u--input>
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
          name: '',
          tel: '',
          department: '',
          gender: '',
          password: '',
        },
        post: {
          username: '',
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
            validator: this.$common.validatePassword_notRequired,
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
      this.$request.checkLogin()
      let nurse_detail = this.$db.get('selected_nurseInfo')
      this.nurse_id = nurse_detail.id
      this.department_list = common.getDepartment_list()
      if (option.department) {
        let passedDepartment = option.department
        this.form1.department = this.department_list[passedDepartment - 1].name
        this.post.department = passedDepartment
      }
      this.form1.name = nurse_detail.name
      this.form1.tel = nurse_detail.tel.toString()
      this.form1.gender = this.genderlist[(nurse_detail.gender) - 1].name
      this.form1.username = nurse_detail.username
      this.form1.department = this.department_list[(nurse_detail.gender) - 1].name;
      this.post.department = nurse_detail.department
      this.post.gender = nurse_detail.gender
    },
    onReady() {
      this.$refs.datetimePicker.setFormatter(this.formatter)
      this.$refs.form1.setRules(this.rules)
    },
    onUnload() {
      this.$db.del('selected_nurseInfo');
    },
    methods: {
      navigateBack() {
        uni.navigateBack()
      },
      sexSelect(e) {
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
          // this.convertToForm();
          if(this.form1.password != ''){
            this.post.password = this.form1.password
          }
          this.post.name = this.form1.name;
          this.post.tel = parseInt(this.form1.tel,10)
          this.post.username = this.form1.username
          this.$request.editNurse(this.nurse_id, this.post).then(res => {
            if (res.statusCode !== 200) {
              this.$.toast('提交失败');
            } else {
              uni.showToast({
                title: "修改成功！",
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    uni.$emit('refurbish', {})
                    uni.$emit('editNurse', {
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
        })

      },
      reset() {
        const validateList = ['form1.username', 'form1.password', 'form1.name',
          'form1.tel', 'form1.department', 'form1.gender',
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
        });
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
