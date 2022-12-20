<template>
  <view class="body">
    <view class="tab-bar-line"></view>
    <view class='content'>
      <view class='member-top'>
        <view class='member-top-c'>
          <view class="user-name">{{admin_info.name}}</view>
          <view class="user-username">{{admin_info.username}}</view>
          <view class="user-department">科室：{{department}}</view>
        </view>
      </view>

      <view class='cell-group'>
        <view class='cell-item right-img'>
          <view class='cell-item-hd'>
            <view class='cell-hd-title'>管理员操作</view>
          </view>
        </view>
      </view>

      <view class='member-grid'>
        <view class='member-item' v-for="(item, index) in adminMenus" :key="index"
          @click="adminNavigateHandle(item.url)">
          <image class='member-item-icon' :src='item.icon'></image>
          <text class='member-item-text'>{{ item.name }}</text>
        </view>
      </view>

      <view class='divider'></view>

      <view class='cell-group'>
        <view class='cell-item right-img'>
          <view class='cell-item-hd'>
            <view class='cell-hd-title'>医院操作</view>
          </view>
        </view>
      </view>

      <view class='member-grid'>
        <view class='member-item' v-for="(item, index) in departmentMenus" :key="index"
          @click="adminNavigateHandle(item.url)">
          <image class='member-item-icon' :src='item.icon'></image>
          <text class='member-item-text'>{{ item.name }}</text>
        </view>
      </view>

      <view class='divider'></view>

      <view class='cell-group'>
        <view class='cell-item right-img'>
          <view class='cell-item-hd'>
            <view class='cell-hd-title'>操作</view>
          </view>
        </view>
      </view>

      <view class="button">
        <u-button type="error" shape="circle" @click="logout" text="登出"></u-button>
      </view>

    </view>
    <tabBar-admin :currentPage="2"></tabBar-admin>
  </view>
  </view>
</template>

<script>
  let windowWidth = 0,
    scrollTimer = false,
    tabBar;
  export default {
    data() {
      return {
        admin_info: {},
        hasLogin: false,
        department_list: [],
        department: '',
        adminMenus: [{
            name: '基本信息',
            icon: '/static/admin-info/about.png',
            url: '/pages/admin/admin_menu/view',
          },
          {
            name: '修改登录信息',
            icon: '/static/admin-info/change.png',
            url: '/pages/admin/admin_menu/editlogin',
          },
          {
            name: '增加管理员',
            icon: '/static/admin-info/addPeople.png',
            url: '/pages/admin/admin_menu/add-admin',
          },
        ],
        departmentMenus: [{
            name: '科室列表',
            icon: '/static/admin-info/department.png',
            url: '/pages/department/department-view',
          },
          {
            name: '静脉列表',
            icon: '/static/admin-info/vein.png',
            url: '/pages/vein/vein-view',
          },
          {
            name: '工具列表',
            icon: '/static/admin-info/tool.png',
            url: '/pages/tool/tool-view',
          },
          {
            name: '药品列表',
            icon: '/static/admin-info/drug.png',
            url: '/pages/drug/drug-view',
          },

        ],
      }
    },
    onReady() {

    },

    onLoad() {
      this.initData();
      uni.$on('editAdmin', (res) => {
        this.initData();
      });
      uni.$on('editAdminLogin', (res) => {
        this.initData();
      });
    },

    onUnload() {
      uni.$off('editAdmin');
      uni.$off('editAdminLogin');
    },

    methods: {
      initData() {
        if (this.$db.get('token')) {
          this.hasLogin = true
          this.admin_info = this.$db.get('current_user')
        } else {
          this.hasLogin = false
        }
        console.log(this.admin_info)
        this.$request.get('/api/list/department').then(res => {
          this.department_list = res.data
          this.department_list.unshift({
            id: 0,
            name: '全部'
          })
          console.log(this.department_list)
          this.department = this.department_list[this.admin_info.department].name
        })
      },

      logout() {
        uni.showModal({
          content: '是否要退出登录',
          success: (res) => {
            if (res.confirm) {
              this.$db.set('login_status', false)
              this.$db.clear()
              uni.showToast({
                title: "退出登录成功",
                icon: 'none'
              })
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }
          }
        })
      },

      adminNavigateHandle(targetUrl) {
        console.log(targetUrl)
        uni.navigateTo({
          url: targetUrl
        })
      },
    },
  }
</script>

<style lang='scss'>
  .body {
    width: 100%;
    overflow: scroll;
    color: #ffffff;
    position: relative;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto
  }

  .button {
    margin-top: 20px;
    margin-bottom: 20px;

    margin-right: 20%;
    margin-left: 20%;
  }

  .member-top {
    position: relative;
    width: 100%;
    height: 300upx;
    background-color: #ffaa00;
  }

  .member-top-c {
    position: absolute;
    text-align: left;
    top: 10%;
    left: 5%;
  }

  .user-name {
    font-size: 55upx;
    color: #000000;
    margin-bottom: 16upx;
    font-weight: 1000;
  }

  .user-username {
    font-size: 40upx;
    color: #000000;
    margin-bottom: 16upx;
    font-weight: bold;
  }

  .user-department {
    font-size: 40upx;
    color: #000000;
    margin-bottom: 16upx;
    font-weight: bold;
  }

  .divider {
    background-color: #f6f6f6;
    height: 10px;
  }
</style>
