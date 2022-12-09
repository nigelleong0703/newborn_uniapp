<template>
  <view>
    <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
      <view v-for="(item,index) in tabBars" :key="item.id" class="nav-item"
        :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
    </scroll-view>
    <view class="tab-bar-line"></view>
    <tabBar-admin :currentPage="1"></tabBar-admin>
  </view>
</template>

<script>
  import common from "common/js/common.js"
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
    },

    methods: {
      loadTabbars() {
        this.department_list = common.getDepartment_list();
        console.log(common.getDepartment_list());
        let tabList = this.department_list;
        // tabList.forEach(item => {
        //   item.newsList = [];
        //   item.loadMoreStatus = 0; //加载更多 0加载前，1加载中，2没有更多了
        //   item.refreshing = 0;
        // })
        this.tabBars = tabList;
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
            this.loadNewsList('add');
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
    height: 100%;
    overflow: hidden;
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
</style>
