<template>
  <view class="body">
    <view class="topbar">
      <view :id="'top'" style="width: 100%;height: 50upx;"></view>
      <view class="top-title-bar">
        <view class="title">
          <text class="title">{{ title }}</text>
        </view>
        <view class="add">
          <u-button class='edit-button' @click="editAdmin">修改</u-button>
        </view>
      </view>
      <view :id="'top'" style="width: 100%;height: 50upx;"></view>
    </view>
    <view class="content">
      <view class="body">
        <view class="nurse-info">
          <u-cell-group :border='false'>
            <u-cell title="姓名" :value="adminInfo.name" :border='false'></u-cell>
            <u-cell title="科室" :value="adminInfo.department_name" :border='false'></u-cell>
            <u-cell title="状态" :value="adminInfo.status" :border='false'></u-cell>
          </u-cell-group>
        </view>
      </view>
    </view>
    <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show_edit" mode="bottom"
      @close="close_edit" @open="open_edit" :closeable="true" :overlay="true">
      <view class="u-popup-slot">
        <view class="tips-2">
          <view :style="'text-align: center'">修改管理员信息</view>
        </view>
        <u--form class="form" labelPosition="left" :model="adminInfoForm" ref="adminInfoForm">
          <u-form-item label="姓名" prop="name" ref="item1">
            <u--input v-model="adminInfoForm.name" placeholder="请输入新的名称"></u--input>
          </u-form-item>
          <u-form-item label="科室" prop="department" ref="item2" @click="department_picker = true">
            <u--input v-model="adminInfoForm.department" disabled disabledColor="#ffffff" placeholder="请选择科室"
              border="none">
            </u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item label="状态" prop="状态" ref="item3">
            <u--input v-model="adminInfoForm.status" placeholder="请输入状态"></u--input>
          </u-form-item>
        </u--form>
        <view class="confirm-button-2">
          <u-button color='orange' type="primary" shape="circle" text="确定修改" @click="confirmAdmin">
          </u-button>
        </view>
      </view>
    </u-popup>
    <u-action-sheet :show="department_picker" :actions="department_list" title="科室选择" description="请选择负责科室"
      closeOnClickOverlay @close="department_picker = false" @select='department_select'>
    </u-action-sheet>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: "管理员资料",
        adminInfo: {
          name: '',
          status: '',
          department: '',
          department_name: '',
          id: '',
        },
        currentInfo: '',
        windowHeight: '',
        department_list: [],
        popup_show_edit: false,
        department_picker: false,
        adminInfoForm: {
          name: '',
          department: '',
          status: '',
        },
        department: '',
        adminRules: {
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
          'department': {
            required: true,
            message: '请选择科室',
            trigger: ['blur', 'change']
          }
        }
      }
    },

    async onLoad() {
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
      console.log(this.windowHeight)
      this.$request.get('/api/list/department').then(res => {
        this.department_list = res.data
        this.department_list.unshift({
          id: 0,
          name: '全部'
        })
        console.log(this.department_list)
        this.getAdminInfo()
      })
      // this.department_list.unshift({
      //   id: 0,
      //   name: '全部'
      // })
    },

    methods: {
      change(e) {
        // console.log('change', e)
      },
      getAdminInfo() {
        this.currentInfo = this.$db.get('current_user');
        this.adminInfo.name = this.currentInfo.name;
        this.adminInfo.status = this.currentInfo.status;
        this.adminInfo.department = this.currentInfo.department;
        this.adminInfo.department_name = this.department_list[this.currentInfo.department].name;
        this.adminInfo.id = this.currentInfo.id
        console.log(this.adminInfo)
      },
      open_edit() {
        this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
          if (this.popup_show_edit == true) {
            this.$refs.adminInfoForm.setRules(this.adminRules)
          }
        })
      },
      close_edit() {
        this.popup_show_edit = false
      },
      editAdmin() {
        this.adminInfoForm.name = this.adminInfo.name
        this.adminInfoForm.department = this.department_list[this.adminInfo.department].name
        this.adminInfoForm.status = this.adminInfo.status
        this.department = this.adminInfo.department
        this.popup_show_edit = true;
      },
      department_select(e) {
        this.adminInfoForm.department = e.name
        this.department = e.id
      },
      confirmAdmin() {
        this.$refs.adminInfoForm.validate().then(res => {
          var submitform = JSON.parse(JSON.stringify(this.adminInfoForm))
          submitform.department = this.department
          console.log(submitform)
          uni.showLoading({
            title: '加载中'
          });
          var patchUrl = '/api/admin/update/' + this.adminInfo.id
          console.log(patchUrl)
          this.$request.patch(patchUrl, submitform).then(res => {
            console.log(res)
            uni.hideLoading();
            if (res.statusCode !== 200) {
              this.$.toast('提交失败(' + res.statusCode + ')');
            } else {
              this.currentInfo.name = this.adminInfoForm.name;
              this.currentInfo.department = this.department;
              this.currentInfo.status = this.adminInfoForm.status
              this.$db.set('current_user', this.currentInfo)
              uni.showToast({
                title: "修改成功！",
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    uni.$emit('refurbish', {})
                    uni.$emit('editAdmin', {})
                    this.close_edit();
                    this.getAdminInfo();
                  }, 1000)
                }
              })

            }
          })


        }).catch(errors => {
          uni.$u.toast('信息有误')
          console.log(errors)
        })
      }

    }
  }
</script>

<style>
  .body {
    overflow: hidden;
    color: #6B8082;
    position: relative;
  }

  .top-title-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }

  .title {
    width: 60%;
    text-align: left;
    top: 10%;
    margin-left: 7px;
  }

  .add {
    width: 40%;
  }

  .edit-button {
    width: 70px;
    height: 30px;
    margin-right: 5vw;
    margin-left: auto;
  }

  .topbar {
    background-color: #ffaa00;
    width: 100%;
    z-index: 10;
  }

  .title text {
    margin-left: 5%;
    font-size: 50rpx;
    font-weight: bold;
    color: #000000;
  }

  .content {
    margin-left: 5%;
    margin-right: 5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }


  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 50rpx;
    font-weight: bold;
    color: #ffaa00;
  }

  .body {
    height: 70vh;
    display: flex;
    flex-direction: column;
  }

  .u-popup-slot {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .tips-2 {
    font-size: 40rpx;
    font-weight: bold;
    color: #333333;
    margin-top: 20rpx;
  }

  .form {
    max-width: 60%;
    margin-left: 15vw;
    margin-right: 15vw;
    margin-top: 52rpx;
    margin-bottom: 52rpx;
    background-color: #ffffff;
    font-size: 26rpx;
    padding: 10rpx;
  }

  .confirm-button-2 {
    margin-left: auto;
    margin-right: auto;
    align-content: center;
    width: 60%;
    margin-bottom: 20px;
  }

  u-popup {
    width: 100%
  }
</style>
