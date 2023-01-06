<template>
  <view class="content">
    <view class="body">
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
      <view class="navigate-bar">
        <u-tabbar :value="value2" @change="name => value2 = name" :fixed="true" :border="false" :placeholder="true"
          :safeAreaInsetBottom="true">
          <u-tabbar-item text="首页" icon="home" @click="patient_list"></u-tabbar-item>
          <u-tabbar-item text="我的" icon="account" @click="nurse_info"></u-tabbar-item>
        </u-tabbar>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "护士资料",
      value2: 1
    }
  },

  onLoad() {
  },

  methods: {
    change(e) {
      this.value2 = e
      console.log('change2', e)
    },
    patient_list() {
      uni.navigateTo({
        url: '/pages/nurse/nurse-patient_list'
      })
    },
    nurse_info() {
      uni.navigateTo({
        url: '/pages/nurse/nurse-info'
      })
    }
  }
}
</script>

<style>
.content {
  height: 100vh;
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
