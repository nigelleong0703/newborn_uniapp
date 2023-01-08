<template>
  <view class="body">
    <topTitleBar :title="title" buttonTitle="增加" @buttonClick="popup_show = true"></topTitleBar>
    <view class='content'>
      <view :id="'top'" style="width: 100%;height: 50upx"></view>
      <view>
        <view v-if="drug_list.length > 0">
          <view v-for="(item, index) in drug_list" :key="index">
            <drugCard :profile="item" buttonTitle="修改" @editSuccess="editSuccess"></drugCard>
          </view>
          <view class='endOfList'>
            已到达最底部啦！
          </view>
        </view>
        <view class='noCard' v-if="drug_list.length === 0">
          暂无信息
        </view>
        <view style="width: 100%;height: 150upx;opacity:0;"></view>
      </view>
      <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show" mode="bottom" @close="close"
        @open="open" :closeable="true" :overlay="true">
        <view class="u-popup-slot">
          <view class="tips">
            添加药品
          </view>
          <view class="form">
            <u--form labelPosition="left" :model="newDrugForm" ref="newDrugForm">
              <u-form-item prop="name" ref="item1">
                <u--input v-model="newDrugForm.name" placeholder="请输入要添加的药品名称"></u--input>
              </u-form-item>
            </u--form>
          </view>
          <view class="confirm-button">
            <u-button color='orange' type="primary" shape="circle" text="确定添加" @click="addDrug">
            </u-button>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
import common from "common/js/common.js"
import drugCard from "components/card/drugCard"
import topTitleBar from "components/topTitleBar/topTitleBar"

let scrollTimer = false,
  tabBar;

export default {
  components: {
    drugCard
  },
  data() {
    return {
      title: '药品列表',
      bdlLoading: true,
      popup_show: false,
      popup_show_edit: false,
      drug_list: [],
      onloading: true,
      windowHeight: '',
      newDrugForm: {
        name: '',
      },
      editName: '',
      rules1: {
        'name': {
          type: 'string',
          required: true,
          message: '请输入药品名称',
          trigger: ['blur', 'change']
        }
      }
    }
  },

  onReady() { },

  async onLoad() {
    this.$request.checkLogin();
    this.windowHeight = uni.getSystemInfoSync().windowHeight;
    this.initData();
    uni.$on('changeData', (res) => {
      this.initData()
    })
  },

  onUnload() {
    uni.$off('changeData');
  },

  methods: {
    initData() {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
      this.$request.getDrugList().then(res => {
        uni.hideLoading();
        this.drug_list = res.data
      })
    },

    open() {
      this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
        if (this.popup_show == true) {
          this.$refs.newDrugForm.setRules(this.rules1)
        }
      })
    },
    close() {
      this.popup_show = false
    },

    addDrug() {
      let that = this
      that.$refs.newDrugForm.validate().then(res => {
        uni.showLoading({
          title: '加载中'
        });
        that.$request.addDrug(that.newDrugForm).then(res => {
          uni.hideLoading()
          if (res.statusCode !== 200) {
            this.$.toast('提交失败');
          } else {
            uni.showToast({
              title: "添加成功！",
              duration: 1000,
              success: () => {
                setTimeout(() => {
                  that.popup_show = false
                }, 1000)
              }
            })
            uni.$emit('changeData', {})
          }
        })

      }).catch(errors => {
        uni.$u.toast('信息有误')
        console.log(errors)
      })
    },
    editSuccess() {
      uni.$emit('changeData', {})
    },
  }
}
</script>

<style lang='scss'>
@import url("/static/css/popup-form.css");

.body {
  overflow: scroll;
  color: #6B8082;
  position: relative;
}

.content {
  margin-left: 5%;
  margin-right: 5%;
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

.endOfList {
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 18px;
}
</style>
