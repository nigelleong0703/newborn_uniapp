<template name="ListViewPeople">
  <view>
    <scroll-view :style="{height: scrollerHeight}" scroll-y="true" scroll-with-animation show-scrollbar="true">
      <view :id="'top' + tabItemIndex" style="width: 100%;height: 180upx;"></view>
      <view class='content'>
        <view v-for="(item, index) in tabItem_list" v-if="tabItem_list.length > 0" :key="index">
          <profileCard :profile="item" buttonTitle="编辑" type="nurse"></profileCard>
        </view>
        <view class='noCard' v-if="tabItem_list.length === 0">
          暂无信息
        </view>
      </view>
      <view :id="'top' + tabItemIndex" style="width: 100%;height: 180upx;"></view>
    </scroll-view>
  </view>
</template>

<script>
  import profileCard from 'components/card/profileCard'

  export default {
    name: 'ListViewPeople',
    props: {
      // tabItem_list: {
      //   type: Array,
      //   default: []
      // },
      tabItemIndex: {
        type: Number,
        default: '',
      },
      type: {
        required: true,
        validator: function(value) {
          return ["nurse", "patient"].includes(value)
        }
      }
    },
    components: {
      profileCard
    },
    computed: {
      scrollerHeight: function() {
        // console.log(uni.getSystemInfoSync())
        // console.log(uni.getSystemInfoSync().windowHeight - 50)
        return (uni.getSystemInfoSync().windowHeight - 50).toString() + 'px';
      }
    },

    data() {
      return {
        tabItem_list: []
      };
    },
    mounted() {
      // console.log('hi')
      if (this.type == 'nurse') {
        this.tabItem_list = this.$db.get('nurseList_' + this.tabItemIndex)
      } else {
        this.tabItem_list = this.$db.get('patientList_' + this.tabItemIndex)
      }
      // console.log(this.tabItem_list)
      uni.$on('refreshData_' + this.type + '_' + this.tabItemIndex.toString(), (res) => {
        this.refresh()
      })
    },
    watch: {
      tabItem_list(val, old) {
        if (val != []) {
          this.tabItem_list = val;
          // console.log(this.tabItem_list)
        }
      }
    },
    methods: {
      refresh() {
        if (this.type == 'nurse') {
          this.tabItem_list = this.$db.get('nurseList_' + this.tabItemIndex)
        } else {
          this.tabItem_list = this.$db.get('patientList_' + this.tabItemIndex)
        }
        uni.hideLoading();
        if (this.tabItem_list != []) {
          // console.log("refresh done on " + this.tabItemIndex.toString())
          // console.log(this.tabItem_list)
        }
        // if (e != this.tabItemIndex) {
        //   return
        // }

      }
    }
  }
</script>

<style>
  @import url("/static/style/admin-home.css");
</style>
