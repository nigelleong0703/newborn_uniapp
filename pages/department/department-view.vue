<template>
  <view class="body" :style="'height: '+ windowHeight + 'px'">
    <view class="topbar">
      <view :id="'top'" style="width: 100%;height: 50upx;"></view>
      <view class="top-title-bar">
        <view class="title">
          <text class="title">{{ title }}</text>
        </view>
        <view class="add">
          <u-button class='add-button' @click="popup_show = true">增加</u-button>
        </view>
      </view>
      <view :id="'top'" style="width: 100%;height: 50upx;"></view>
    </view>
    <view class='content'>
      <scroll-view scroll-y="true" scroll-with-animation>
        <view :id="'top'" style="width: 100%;height: 50upx;"></view>
        <view class='card' v-for="(item,index) in department_list" v-if="department_list.length > 0" :key="index">
          <view class="card-item card-item-view">{{item.id}} {{item.name}}</view>
          <view class="card-item-edit">
            <u-button class='button card-item card-button' plain color="orange" @click="editDepartmentButton(index)"
              text="修改">
            </u-button>
          </view>
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
          <view class="confirm-button">
            <u-button color='orange' type="primary" shape="circle" text="确定添加" @click="addDepartment">
            </u-button>
          </view>
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
          <view class="confirm-button">
            <u-button color='orange' type="primary" shape="circle" text="确定修改" @click="editDepartment">
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
  import common from "common/js/common.js"

  let scrollTimer = false,
    tabBar;

  export default {
    data() {
      return {
        title: '科室列表',
        bdlLoading: true,
        popup_show: false,
        popup_show_edit: false,
        department_list: [],
        onloading: true,
        windowHeight: '',
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

    onReady() {},

    async onLoad() {
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
      console.log(this.windowHeight)
      this.initData();
    },

    onUnload() {
      uni.$off('addNewNurse');
    },

    methods: {
      initData() {
        uni.showLoading({
          title: '加载中'
        });
        this.$request.get('/api/list/department').then(res => {
          uni.hideLoading();
          console.log(res)
          this.department_list = res.data
        })
        // this.$api.get('/api/list/department').then(res => {
        //   console.log(res)
        //   uni.setStorageSync('department_list', res.data)
        // })
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
          let newformData = new FormData();
          newformData.append('name', this.newDepartmentForm.name);
          console.log(newformData);
          this.$request.post('/api/list/department/add', newformData).then(res => {
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
      editDepartment() {
        this.$refs.editDepartmentForm.validate().then(res => {
          console.log(this.editDepartmentForm)
          this.$request.post('/api/list/department/update/' + this.editDepartmentForm.id, this
            .editDepartmentForm
            .name).then(res => {
            console.log(res)
            if (res.statusCode !== 200) {
              this.$.toast('提交失败');
            } else {
              uni.showToast({
                title: "修改成功！",
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
    overflow: hidden;
    color: #6B8082;
    position: relative;
  }

  .top-title-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title {
      width: 60%;
      text-align: left;
      top: 10%;
      left: 10%;
    }

    .add {
      width: 40%;
    }

    .add-button {
      width: 70px;
      height: 30px;
      margin-right: 5vw;
      margin-left: auto;
    }
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
    height: 100%
  }

  .card {
    height: 100upx;
    background-color: white;
    margin: 0 auto 42upx auto;
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .card-item {
      margin: 10px auto
    }

    .card-item-view {
      width: 60%;
      text-align: left;
      top: 10%;
      margin-left: 5%;
      align-self: center;
      font-size: 35rpx;
      font-weight: bold;
    }

    .card-item-edit {
      width: 40%;
      align-self: center;

      .card-item-edit .button {
        width: 100px;
        margin-right: 10vw;
        margin-left: auto;
      }
    }

    .card-button {
      width: 70px;
    }
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
    box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.10);
    border-radius: 10upx;
  }

  .u-popup-slot {
    width: 100%;
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
    background-color: #ffffff;
    font-size: 26rpx;
    padding: 10rpx;
  }

  .confirm-button {
    width: 60%;
    margin-bottom: 20px;
  }

  scroll-view {
    height: 100%
  }
</style>
