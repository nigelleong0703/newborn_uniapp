<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
      // #ifdef APP-PLUS
      // 锁定屏幕方向
      plus.screen.lockOrientation('portrait-primary');
      // #endif
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  @import "@/uni_modules/uview-ui/index.scss";
  @import './static/css/style.css';
</style>
