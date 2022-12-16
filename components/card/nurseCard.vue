<template name="nurseCard">
  <view class='card'>
    <view class="card-item card-item-view">
      <view class="first-title">
        {{nurseName}}
      </view>
      <view class="second-title">
        {{nurseGender}} {{nurseNumber}}
      </view>
    </view>
    <view class="card-item-edit">
      <u-button class='button card-button' plain color="orange" @click="viewNurseInfo" :text="buttonTitle">
      </u-button>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'nurseCard',
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
        nurseName: '',
        nurseGender: '',
        nurseNumber: '',
      }
    },
    mounted() {
      this.nurseName = this.profile.name
      this.nurseNumber = this.profile.tel
      if (this.profile.gender == 1) {
        this.nurseGender = '男'
      } else {
        this.nurseGender = '女'
      }
    },
    methods: {
      viewNurseInfo() {
        let targetUrl = '/pages/admin/admin-nurse/admin-nurse-info'
        targetUrl = targetUrl + '?id=' + this.profile.id
        uni.navigateTo({
          url: targetUrl
        })
      },
    }
  }
</script>

<style>
  @import url("/components/card/card.css");
</style>
