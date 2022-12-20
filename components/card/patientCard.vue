<template name="patientCard">
  <view class='card'>
    <view class="card-item card-item-view">
      <view class="first-title">
        {{patientName}}
      </view>
      <view class="second-title">
        {{patientGender}} {{patientBirthdate}}
      </view>
    </view>
    <view class="card-item-edit">
      <u-button class='button card-button' plain color="orange" @click="viewPatientInfo" :text="buttonTitle">
      </u-button>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'patientCard',
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
        patientName: '',
        patientGender: '',
        patientBirthdate: '',
      }
    },
    mounted() {
      this.patientName = this.profile.name
      this.patientBirthdate = uni.$u.timeFormat(this.profile.birthdate)
      if (this.profile.gender == 1) {
        this.patientGender = '男'
      } else {
        this.patientGender = '女'
      }
    },
    methods: {
      viewPatientInfo() {
        let patientUrl = '/pages/admin/admin-patient/admin-patient-info'
        patientUrl = patientUrl + '?id=' + this.profile.id
        uni.navigateTo({
          url: patientUrl
        })
      },
    }
  }
</script>

<style>
  @import url("/components/card/card.css");
</style>
