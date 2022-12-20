<template>
  <view class="body">
    <view class='nav'>
      <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
        <view v-for="(item,index) in tabBars" :key="item.id" class="nav-item"
          :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
      </scroll-view>
    </view>

    <!--   </view> -->
    <swiper style="min-height: 100vh;" :current="tabCurrentIndex" @change="changeTab">
      <swiper-item v-for="(tabItem, tabItemIndex) in tabBars" :key="tabItem.id">
        <scroll-view style="height: 100%;" scroll-y="true" scroll-with-animation>
          <view :id="'top'+tabItemIndex" style="width: 100%;height: 180upx;">边距盒子</view>
          <view class='content'>
            <view v-for="(item,index) in tabItem.list" v-if="tabItem.list.length > 0" :key="index">
              <patientCard :profile="item" buttonTitle="查看"></patientCard>
            </view>
            <view class='noCard' v-if="tabItem.list.length===0">
              暂无信息
            </view>
          </view>
          <view style="width: 100%;height: 150upx;opacity:0;"></view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <view>
      <addBtn url="/pages/patient/add-patient" :params="{department: (tabCurrentIndex+1)}"></addBtn>
      <tabBar-admin class="bottom-bar" :currentPage="1"></tabBar-admin>
    </view>
  </view>
</template>

<script>
  import common from "common/js/common.js"
  import patientCard from "components/card/patientCard"

  let windowWidth = 0,
    scrollTimer = false,
    tabBar;

  export default {
    components: {
      patientCard
    },
    data() {
      return {
        tabCurrentIndex: 0,
        scrollLeft: 0,
        enableScroll: true,
        department_list: [],
        tabBars: [],
      }
    },

    onReady() {
      this._lastTabIndex = 0;
      this.swiperWidth = 0;
      this.tabbarWidth = 0;
      this.tabListSize = {};
      this._touchTabIndex = 0;
      this.$forceUpdate();
    },


    async onLoad() {
      windowWidth = uni.getSystemInfoSync().windowWidth;
      this.loadTabbars()
      this.$forceUpdate();
      console.log(this.tabBars);
      uni.$on('addNewPatient', (res) => {
        this.selectKehuFun(res.department - 1).then(res => {
          this.tabBars[res.department - 1].list = res
        })
        this.$forceUpdate();
      })
    },


    onUnload() {
      uni.$off('addNewPatient');
    },

    methods: {
      loadTabbars() {
        this.department_list = common.getDepartment_list();
        console.log(common.getDepartment_list());
        let tabList = this.department_list;
        var index = 0;
        tabList.forEach(item => {
          item.index = index
          item.noData = true;
          item.refreshText = '';
          item.refreshing = false;
          item.list = [];
          index++;
        })
        tabList.forEach(item => {
          console.log(item.index)
          this.selectKehuFun(item.index).then(res => {
            item.list = res
            item.list.forEach(itemInfo => {
              if (itemInfo.gender == 1) {
                itemInfo.gender2 = '男'
              } else {
                itemInfo.gender2 = '女'
              }
              console.log(itemInfo.gender2)
              itemInfo.birthdate = uni.$u.timeFormat(itemInfo.birthdate)
              console.log(itemInfo.birthdate)
            })
          })
        })
        this.tabBars = tabList;
      },

      selectKehuFun(index) {
        return new Promise((resolve, reject) => {
          let that = this
          uni.showLoading({
            title: '加载中...',
            mask: true
          })
          let departmentNo = index + 1
          let params = {
            department: departmentNo
          }
          that.$request.get('/api/patient', params).then(res => {
            console.log(res)

            if (res.statusCode === 200) {
              resolve(res.data.patient)
            } else {
              that.$.toast('获取失败，错误代码' + res.statusCode);
              reject()
            }
          })
          uni.hideLoading();
        })
      },

      async changeTab(e) {
        if (scrollTimer) {
          //多次切换只执行最后一次
          clearTimeout(scrollTimer);
          scrollTimer = false;
        }
        let index = e;
        //e=number为点击切换，e=object为swiper滑动切换
        if (typeof e === 'object') {
          index = e.detail.current
        }
        if (typeof tabBar !== 'object') {
          tabBar = await this.getElSize("nav-bar")
        }
        //计算宽度相关
        let tabBarScrollLeft = tabBar.scrollLeft;
        let width = 0;
        let nowWidth = 0;
        //获取可滑动总宽度
        for (let i = 0; i <= index; i++) {
          let result = await this.getElSize('tab' + i);
          width += result.width;
          if (i === index) {
            nowWidth = result.width;
          }
        }
        if (typeof e === 'number') {
          //点击切换时先切换再滚动tabbar，避免同时切换视觉错位
          this.tabCurrentIndex = index;
        }
        //延迟200ms,等待swiper动画结束再修改tabbar
        scrollTimer = setTimeout(() => {
          if (width - nowWidth / 2 > windowWidth / 2) {
            //如果当前项越过中心点，将其放在屏幕中心
            this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
          } else {
            this.scrollLeft = 0;
          }
          if (typeof e === 'object') {
            this.tabCurrentIndex = index;
          }
          this.tabCurrentIndex = index;

          //第一次切换tab，动画结束后需要加载数据
          let tabItem = this.tabBars[this.tabCurrentIndex];
          if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
            // this.loadNewsList('add');
            // this.selectKehuFun(this.tabCurrentIndex).then(res => {
            //   this.tabBars[this.tabCurrentIndex].list = res
            // })
            this.$forceUpdate();
            /////////////////
            /////////////////
            tabItem.loaded = true;
          }
        }, 100)
      },

      getElSize(id) {
        return new Promise((res, rej) => {
          let el = uni.createSelectorQuery().select('#' + id);
          el.fields({
            size: true,
            scrollOffset: true,
            rect: true
          }, (data) => {
            res(data);
          }).exec();
        });
      },

      viewPatientInfo(id) {
        console.log(id)
        let patientUrl = '/pages/admin/admin-patient/admin-patient-info'
        patientUrl = patientUrl + '?id=' + id
        uni.navigateTo({
          url: patientUrl
        })
      },
    },
  }
</script>

<style lang='scss'>
  @import url("/static/style/admin-home.css");

  .body {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    color: #6B8082;
    position: relative;
    background-color: #f6f6f6;
  }

  .nav {
    position: fixed;
    left: 0;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 24upx;
    background-color: #50B7EA;
    z-index: 996;
  }

  .nav-bar {
    position: relative;
    z-index: 10;
    height: 90upx;
    white-space: nowrap;
    box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
    background-color: #ffffff;

    .nav-item {
      display: inline-block;
      /* width: 200upx; */
      margin-left: 30upx;
      margin-right: 30upx;
      height: 90upx;
      text-align: center;
      line-height: 90upx;
      font-size: 30upx;
      color: #303133;
      position: relative;

      &:after {
        content: '';
        width: 0;
        height: 0;
        border-bottom: 4upx solid #ffaa00;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        transition: .3s;
      }
    }

    .current {
      color: #ffaa00;

      &:after {
        width: 50%;
      }
    }
  }
</style>
