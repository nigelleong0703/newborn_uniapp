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
    <view class="content">
      <view class="body">
        <view class="nurse-info">
          <u-cell-group :border='false'>
            <u-cell title="ID" :value="adminInfo.id" :border='false'></u-cell>
            <u-cell title="姓名" :value="adminInfo.name" :border='false'></u-cell>
            <u-cell title="科室" :value="adminInfo.department" :border='false'></u-cell>
            <u-cell title="状态" :value="adminInfo.status" :border='false'></u-cell>
          </u-cell-group>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: "管理员资料",
        adminInfo: '',
        windowHeight: '',
      }
    },

    onLoad() {
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
      console.log(this.windowHeight)
      this.getAdminInfo()
    },

    methods: {
      change(e) {
        // console.log('change2', e)
      },
      getAdminInfo() {
        this.adminInfo = this.$db.get('current_user')
        console.log(this.adminInfo)
        // this.$request.get(path).then(res => {
        //     this.nurseInfo = res.data;
        //     if (res.data.gender == 0) {
        //         this.nurse_gender = '男';
        //     }

        //     else if (res.data.gender == 1) {
        //         this.nurse_gender = '女';
        //     }
        //     console.log(res)
        // })
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

  .add-button {
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
</style>
