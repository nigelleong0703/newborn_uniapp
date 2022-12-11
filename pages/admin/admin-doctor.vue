<template>
  <view class="body">
    <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
      <view v-for="(item,index) in tabBars" :key="item.id" class="nav-item"
        :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
    </scroll-view>
    <!-- 内容部分 -->
    <view class="content">
      <swiper id="swiper" class="swiper-box" :duration="200" :current="tabCurrentIndex" @change="changeTab">
        <swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
          <!--        <scroll-view scroll-y="true" :style="{height: '80vh'}" @scrolltolower="selectKehuFun(tabItem)" refresher-enabled
          :refresher-threshold="200" :refresher-triggered="triggered" @refresherrefresh="onRefresh(tabItem)"
          @refresherrestore="onRestore(tabItem)"> -->
          <scroll-view class="scrollClass" scroll-y="true">
            <view v-if="tabItem.list.length > 0">
              <!--            <view v-for="(item, index) in list" :key="index" @click="khCardClickFun(item)"> -->
              <view v-for="(item, index) in tabItem.list" :key="index">
                <!--              <khCard :item=" item" :isSelect="isSelect" :index="index" @cxGetDataFun="cxGetDataFun">
              </khCard> -->
                <view>{{item.name}}</view>
              </view>
              <!--            <getMore :isMore="isMore" nullMsg="已加载全部~"></getMore>
            <view class="h200"></view> -->
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
      <view :style="{flex: 0}">
        <tabBar-admin class="bottom-bar" :currentPage="1"></tabBar-admin>
      </view>
    </view>
    <view class="bottom-r">
      <addBtn url="./addKeHu?isAdd=1"></addBtn>
    </view>
  </view>
</template>

<script>
  import common from "common/js/common.js"
  import khCard from 'components/card/kehu.vue'

  let windowWidth = 0,
    scrollTimer = false,
    tabBar;
  export default {
    data() {
      return {
        tabCurrentIndex: 0,
        scrollLeft: 0,
        enableScroll: true,
        department_list: [],
        tabBars: [],
        triggered: false,
        _freshing: false,
      }
    },
    onReady() {
      this._lastTabIndex = 0;
      this.swiperWidth = 0;
      this.tabbarWidth = 0;
      this.tabListSize = {};
      this._touchTabIndex = 0;
    },

    async onLoad() {
      windowWidth = uni.getSystemInfoSync().windowWidth;
      this.loadTabbars();
      uni.$on('addNewDoctor', (res) => {
        this.selectKehuFun(this.tabBars[res.department])
      })
      // uni.$on('cxGetDataFun', this.cxGetDataFun)
    },

    onUnload() {
      uni.$off('addNewDoctor');
    },

    methods: {
      loadTabbars() {
        this.department_list = common.getDepartment_list();
        console.log(common.getDepartment_list());
        let tabList = this.department_list;
        var index = 0;
        tabList.forEach(item => {
          item.list = [];
          item.moreShow = false;
          item.triggered = false;
          item.isMore = true;
          item._freshing = false;
          item.index = index
          index++;
        })
        this.tabBars = tabList;
        this.tabBars.forEach(item => {
          this.selectKehuFun(item)
        })
      },

      selectKehuFun: function(tabItem) {
        console.log(tabItem)
        if (!tabItem.isMore) {
          return
        }
        uni.showLoading({
          title: '加载中...',
          mask: true
        })
        let departmentNo = tabItem.index + 1
        let params = {
          department: departmentNo
        }
        this.$request.get('/api/doctor', params).then(res => {
          if (res.statusCode !== 200) {
            this.$.toast('获取失败，错误代码' + res.statusCode);
          } else {
            let data = res.data;
            tabItem.list = data.nurse
          }
        })
        uni.hideLoading();
      },

      // onRefresh: function(tabItem) {
      //   if (this._freshing) return
      //   this._freshing = true;
      //   if (!this.triggered) {
      //     this.triggered = true;
      //   }
      //   console.log(tabItem)
      //   this.cxGetDataFun(tabItem);
      //   setTimeout(() => {
      //     this.triggered = false; //触发onRestore，并关闭刷新图标  
      //     this._freshing = false;
      //   }, 3000)
      //   console.log("onRefreshDone")
      //   return
      // },
      // onRestore: function() {
      //   console.log("onRestore")
      // },
      // cxGetDataFun: function(tabItem) {
      //   tabItem.pageIndex = 1;
      //   tabItem.isMore = true;
      //   console.log(tabItem)
      //   this.selectKehuFun(tabItem);
      // },

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
        //延迟300ms,等待swiper动画结束再修改tabbar
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
            this.selectKehuFun(this.tabBars[this.tabCurrentIndex])
            /////////////////
            /////////////////
            tabItem.loaded = true;
          }
        }, 300)
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
    },
  }
</script>

<style lang='scss'>
  page,
  .content {
    background-color: #f8f8f8;
    overflow: hidden;
  }

  .body {
    height: 100vh;
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

  view {
    display: flex;
    flex-direction: column;
  }

  .content {
    min-height: 100%;
  }

  .swiper-box {
    flex: 1;
  }

  tabBar-admin {
    flex: 0;
  }
</style>
