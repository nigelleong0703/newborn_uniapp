<template>
  <view class="navTabBox">
    <view class="longTab">
      <!--      <scroll-view scroll-x="true" style="white-space: nowrap; display: flex" scroll-with-animation
        :scroll-left="tabLeft">
        <view class="longItem" :data-index="index" :class="index===tabClick?'click':''" v-for="(item,index) in tabTitle"
          :key="index" :id="'id'+index" @click="longClick(index)">{{item}}</view>
        <view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
          <view class="underline"></view>
        </view>
      </scroll-view> -->
      <!--      <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="tabLeft">
        <view :data-index="index" :class="index===tabClick?'click':''" v-for="(item,index) in tabTitle" :key="index"
          :id="'id'+index" @click="changeTab(index)">{{item}}</view>
      </scroll-view> -->
      <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="tabLeft">
        <view v-for="(item,index) in tabTitle" :key="index" class="nav-item" :class="{current: index === tabClick}"
          :id="'tab'+index" @click="changeTab(index)">{{item}}</view>
      </scroll-view>
    </view>
  </view>
</template>


<script>
  export default {
    name: 'navTab',
    props: {
      tabTitle: {
        type: Array,
        default: []
      }

    },
    data() {
      return {
        tabClick: 0, //导航栏被点击
        isLeft: 0, //导航栏下划线位置
        isWidth: 0, //每个导航栏占位
        tabLeft: 0
      };
    },
    methods: {
      // 导航栏点击
      // longClick(index) {
      //   if (this.tabTitle.length > 5) {
      //     var tempIndex = index - 2;
      //     tempIndex = tempIndex <= 0 ? 0 : tempIndex;
      //     this.tabLeft = (index - 2) * this.isWidth //设置下划线位置
      //   }
      //   this.tabClick = index //设置导航点击了哪一个
      //   this.isLeft = index * this.isWidth //设置下划线位置
      //   this.$emit('changeTab', index); //设置swiper的第几页
      //   // this.$parent.currentTab = index //设置swiper的第几页
      // }
      async changeTab(e) {
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
          this.tabClick = index;
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
            this.tabClick = index;
          }
          this.tabClick = index;

          //第一次切换tab，动画结束后需要加载数据
          let tabItem = this.tabBars[this.tabClick];
          if (this.tabClick !== 0 && tabItem.loaded !== true) {
            // this.loadNewsList('add');
            /////////////////
            /////////////////
            tabItem.loaded = true;
          }
        }, 100)
        this.$emit('changeTab', index);
      },
    }
  }
</script>

<style lang="scss">
  // .navTabBox {
  //   width: 100vw;
  //   color: rgba(255, 255, 255, 0.50);

  //   .click {
  //     color: white;
  //   }

  //   .longTab {
  //     width: 100%;

  //     .longItem {
  //       height: 90upx;
  //       display: inline-block;
  //       line-height: 90upx;
  //       text-align: center;
  //       font-size: 30upx;
  //       font-weight: bolder;
  //     }

  //     .underlineBox {
  //       height: 3px;
  //       width: 20%;
  //       display: flex;
  //       align-content: center;
  //       justify-content: center;
  //       transition: .5s;

  //       .underline {
  //         width: 84upx;
  //         height: 4px;
  //         background-color: white;
  //       }
  //     }
  //   }
  // }
  .nav-bar {
    position: relative;
    z-index: 10;
    height: 90upx;
    white-space: nowrap;
    box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
    background-color: #rgba(255, 255, 255, 0.50);

    .nav-item {
      display: inline-block;
      /* width: 200upx; */
      margin-left: 30upx;
      margin-right: 30upx;
      height: 90upx;
      text-align: center;
      line-height: 90upx;
      font-size: 30upx;
      color: #ffffff;
      position: relative;
      font-size: 30upx;
      font-weight: bolder;

      &:after {
        content: '';
        width: 0;
        height: 0;
        border-bottom: 4upx solid #ffffff;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        transition: .3s;
      }
    }
  }
</style>
