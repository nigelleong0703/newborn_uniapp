<template>
  <view class="body">
    <view class="topbar">
      <view :id="'top'" style="width: 100%;height: 50upx;"></view>
      <view class="title">
        <text class="title">{{ title }}</text>
      </view>
      <u-button @click="popup_show = true">增加</u-button>
      <view :id="'top'" style="width: 100%;height: 50upx;"></view>
    </view>
    <view class='content'>
      <scroll-view scroll-y="true" scroll-with-animation>
        <view class='card' v-for="(item,index) in department_list" v-if="department_list.length > 0" :key="index">
          <view>{{item.id}}</view>
          <view>{{item.name}}</view>
          <u-button class='button' type='default' @click="editDepartmentButton(index)" text="view"></u-button>
        </view>
        <view class='noCard' v-if="department_list.length===0">
          暂无信息
        </view>
        <view style="width: 100%;height: 150upx;opacity:0;"></view>
      </scroll-view>
      <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show" mode="bottom" @close="close"
        @open="open" :closeable="true" :overlay="true">
        <view class="u-popup-slot">
          <text class="tips">添加科室</text>
          <u--form class="form" labelPosition="left" :model="newDepartmentForm" ref="newDepartmentForm">
            <u-form-item prop="name" ref="item1">
              <u--input v-model="newDepartmentForm.name" placeholder="请输入要添加的科室名称"></u--input>
            </u-form-item>
          </u--form>
          <u-button class="confirm-button" type="primary" shape="circle" text="确定添加" @click="addDepartment">
          </u-button>
        </view>
      </u-popup>
      <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show_edit" mode="bottom"
        @close="close_edit" @open="open_edit" :closeable="true" :overlay="true">
        <view class="u-popup-slot">
          <text class="tips">修改科室{{editName}}</text>
          <u--form class="form" labelPosition="left" :model="editDepartmentForm" ref="editDepartmentForm">
            <u-form-item prop="name" ref="item1">
              <u--input v-model="editDepartmentForm.name" placeholder="请输入新的名称"></u--input>
            </u-form-item>
          </u--form>
          <u-button class="confirm-button" type="primary" shape="circle" text="确定修改" @click="editDepartment">
          </u-button>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
  import common from "common/js/common.js"


  let windowWidth = 0,
    scrollTimer = false,
    tabBar;

  export default {
    data() {
      return {
        title: '科室列表',
        bdlLoading: true,
        popup_show: false,
        popup_show_edit: false,
        department_list: [],
        newDepartmentForm: {
          name: '',
        },
        editDepartmentForm: {
          name: '',
          id: '',
        },
        editName: '',
        rules1: {
          'name': {
            type: 'string',
            required: true,
            message: '请输入科室名称',
            trigger: ['blur', 'change']
          }
        }
      }
    },

    onReady() {
      // this.$refs.newDepartmentForm.setRules(this.rules1)
    },

    async onLoad() {
      windowWidth = uni.getSystemInfoSync().windowWidth;
      this.loadTabbars();
    },

    onUnload() {
      uni.$off('addNewNurse');
    },

    methods: {
      loadTabbars() {
        this.department_list = common.getDepartment_list();
        console.log(common.getDepartment_list());
      },

      open() {
        this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
          if (this.popup_show == true) {
            this.$refs.newDepartmentForm.setRules(this.rules1)
          }
        })
      },
      close() {
        this.popup_show = false
      },

      addDepartment() {
        this.$refs.newDepartmentForm.validate().then(res => {
          console.log(this.newDepartmentForm)
          this.$request.post('/api/list/department/add', this.newDepartmentForm).then(res => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$.toast('提交失败');
            } else {
              uni.showToast({
                title: "添加成功！",
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    this.popup_show = false
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

      editDepartmentButton(index) {
        this.popup_show_edit = true;
        this.editName = this.department_list[index].name
        this.editDepartmentForm.id = index + 1
      },

      open_edit() {
        this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
          if (this.popup_show_edit == true) {
            this.$refs.editDepartmentForm.setRules(this.rules1)
          }
        })
      },
      close_edit() {
        this.popup_show_edit = false
        this.editDepartmentForm = {
          name: '',
          id: ''
        }
      },
      addDepartment() {
        this.$refs.editDepartmentForm.validate().then(res => {
          console.log(this.editDepartmentForm)
          this.$request.post('/api/list/department/update/' + this.editDepartmentForm.id, this.editDepartmentForm
            .name).then(res => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$.toast('提交失败');
            } else {
              uni.showToast({
                title: "添加成功！",
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    this.popup_show_edit = false
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
    }
  }
</script>

<style lang='scss'>
  .body {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    color: #6B8082;
    position: relative;
    background-color: #f6f6f6;

    view {
      width: 100%
    }
  }

  .topbar {
    background-color: #f6f6f6;
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
  }

  .card {
    height: 150upx;
    background-color: white;
    margin: 0 auto 42upx auto;
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    position: relative;
  }

  .noCard {
    width: 90%;
    height: 200upx;
    margin: auto;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
    box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
    border-radius: 10upx;
  }

  .u-popup-slot {
    width: 200px;
    @include flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .tips {
    font-size: 40rpx;
    font-weight: bold;
    color: #333333;
    margin-top: 20rpx;
    margin-top: 20rpx;
  }

  .form {
    max-width: 60%;
    margin-left: 15vw;
    margin-right: 15vw;
    margin-top: 52rpx;
    margin-bottom: 52rpx;
    background-color: #FBFBFB;
    font-size: 26rpx;
    padding: 10rpx;
  }

  .confirm-button {
    width: 400rpx;
    height: 70rpx;
    color: #FFFFFF;
    border-radius: 36rpx;
    text-align: center;
    line-height: 70rpx;
    font-size: 30rpx;
    margin-bottom: 82rpx;
  }
</style>
