<template name="veinCard">
  <view class='card'>
    <view class="card-item card-item-view">
      <view class="first-title-smaller">
        {{veinName}}
      </view>
    </view>
    <view class="card-item-edit">
      <u-button class='button card-button' plain color="orange" @click="editVein" :text="buttonTitle">
      </u-button>
    </view>
    <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show" mode="bottom" @close="close"
      @open="open" :closeable="true" :overlay="true">
      <view class="u-popup-slot">
        <view class="tips">
          修改静脉 - {{veinName}}
        </view>
        <view class="form">
          <u--form labelPosition="left" :model="editVeinForm" ref="editVeinForm">
            <u-form-item prop="name" ref="item1">
              <u--input v-model="editVeinForm.name" placeholder="请输入新的静脉名称"></u--input>
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
    name: 'veinCard',
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
        veinId: '',
        veinName: '',
        popup_show: false,
        editVeinForm: {
          name: '',
        },
        rules1: {
          'name': {
            type: 'string',
            required: true,
            message: '请输入静脉名称',
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
        this.veinId = this.profile.id
        this.veinName = this.profile.name
      },
      editVein() {
        this.popup_show = true;
      },
      open() {
        this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
          if (this.popup_show == true) {
            this.$refs.editVeinForm.setRules(this.rules1)
          }
        })
      },
      close() {
        this.popup_show = false
        this.editVeinForm = {
          name: '',
        }
      },
      submit() {
        let that = this
        that.$refs.editVeinForm.validate().then(res => {
          uni.showLoading({
            title: '加载中'
          });
          that.$request.editVein(this.veinId, this.editVeinForm).then(res => {
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
                  that.veinName = that.editVeinForm.name
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
