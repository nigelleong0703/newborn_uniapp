<template>
  <view class="content">
    <view class="body">
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
      <view class="nurse-info">
        <u-cell-group :border='false'>
          <u-cell title="姓名" :value="nurseInfo.name" :border='false'></u-cell>
          <u-cell title="性别" :value="gender_name" :border='false'></u-cell>
          <u-cell title="科室" :value="department_name" :border='false'></u-cell>
          <u-cell title="联系电话" :value="nurseInfo.tel" :border='false'></u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script>
  import common from "common/js/common.js"
  export default {
    data() {
      return {
        title: "护士资料",
        value2: 1,
        nurseInfo: {
          name: '',
          tel: '',
        },
        passedID: '',
        gender_list: [{
          id: 1,
          name: '男',
        }, {
          id: 2,
          name: '女',
        }],
        department_list: '',
        gender_name: '',
        department_name: '',
      }
    },

    onLoad(option) {
      this.$request.checkLogin();
      if (option.id) {
        this.passedID = option.id
      }
      this.getNurse_info(this.passedID)
      this.department_list = common.getDepartment_list()
    },

    methods: {
      change(e) {
        this.value2 = e
        console.log('change2', e)
      },
      getNurse_info(passedID) {
        let path = '/api/nurse/' + passedID
        console.log(path)
        this.$request.get(path).then(res => {
          this.nurseInfo = res.data;
          console.log(res)
          this.gender_name = this.gender_list[(res.data.gender) - 1].name;
          this.department_name = this.department_list[(res.data.department) - 1].name;
        })
      }
    }
  }
</script>

<style>
  .content {
    height: 75vh;
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

  .button {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20%;
    margin-left: 20%;
  }
</style>
