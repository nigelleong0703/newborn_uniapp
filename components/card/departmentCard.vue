<template name="departmentCard">
  <view class='card'>
    <view class="card-item card-item-view">
      <view class="first-title-smaller">
        {{departmentName}}
      </view>
    </view>
    <view class="card-item-edit">
      <u-button class='button card-button' plain color="orange" @click="editDepartment" :text="buttonTitle">
      </u-button>
      <u-button class='button card-button' plain color="red" @click="deleteDepartment" text="删除">
      </u-button>
    </view>
    <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show" mode="bottom" @close="close"
      @open="open" :closeable="true" :overlay="true">
      <view class="u-popup-slot">
        <view class="tips">
          修改科室 - {{departmentName}}
        </view>
        <view class="form">
          <u--form labelPosition="left" :model="editDepartmentForm" ref="editDepartmentForm">
            <u-form-item prop="name" ref="item1">
              <u--input v-model="editDepartmentForm.name" placeholder="请输入新的名称"></u--input>
            </u-form-item>
          </u--form>
        </view>
        <view class="confirm-button">
          <u-button color='orange' type="primary" shape="circle" text="确定修改" @click="submit">
          </u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'departmentCard',
    props: {
      profile: {
        type: Object,
        default: () => {}
      },
      buttonTitle: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        departmentId: '',
        departmentName: '',
        popup_show: false,
        editDepartmentForm: {
          name: '',
        },
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
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.departmentId = this.profile.id
        this.departmentName = this.profile.name
      },
      editDepartment() {
        this.popup_show = true;
      },
      deleteDepartment() {
        uni.showModal({
          content: '是否要删除？',
          success: (res) => {
            if (res.confirm) {
              this.$request.deleteDepartment(this.departmentId)
              uni.showToast({
                title: "删除成功",
                icon: 'none'
              })
              uni.$emit('changeData', {})
            }
          }
        })
      },
      open() {
        this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
          if (this.popup_show == true) {
            this.$refs.editDepartmentForm.setRules(this.rules1)
          }
        })
      },
      close() {
        this.popup_show = false
        this.editDepartmentForm = {
          name: '',
        }
      },
      submit() {
        let that = this
        that.$refs.editDepartmentForm.validate().then(res => {
          uni.showLoading({
            title: '加载中'
          });
          that.$request.editDepartment(this.departmentId, this.editDepartmentForm).then(res => {
            console.log(res)
            uni.hideLoading()
            if (res.statusCode !== 200) {
              this.$.toast('提交失败');
            } else {
              uni.showToast({
                title: "修改成功！",
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    this.popup_show = false
                  }, 1000)
                  console.log('hi')
                  this.$emit('editSuccess');
                  that.departmentName = that.editDepartmentForm.name
                }
              })
            }
          })
        }).catch(errors => {
          uni.$u.toast('信息有误')
          console.log(errors)
        })
      },
    },
  }
</script>

<style>
  @import url("/components/card/card.css");
  @import url("/static/css/popup-form.css");
</style>
