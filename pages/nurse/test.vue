<template>
    <view class="u-page">
        <view class="u-page__item">
            <text class="u-page__item__title">固定在底部(固定在屏幕最下方)</text>
            <u-gap height="150"></u-gap>
            <u-tabbar :value="value6" @change="name => value6 = name" :fixed="true" :placeholder="true"
                :safeAreaInsetBottom="true">
                <u-tabbar-item text="首页" icon="home"></u-tabbar-item>
                <u-tabbar-item text="放映厅" icon="photo"></u-tabbar-item>
                <u-tabbar-item text="直播" icon="play-right"></u-tabbar-item>
                <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
            </u-tabbar>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            value6: 0,
        }
    },
    onLoad() {

    },
    methods: {
        change1(e) {
            this.value6 = e
            console.log('change1', e);
        },
        click1(e) {
            console.log('click1', e);
        }
    },
}
</script>

<style lang="scss">
.u-page {
    padding: 0;

    &__item {

        &__title {
            color: $u-tips-color;
            background-color: $u-bg-color;
            padding: 15px;
            font-size: 15px;

            &__slot-title {
                color: $u-primary;
                font-size: 14px;
            }
        }

        &__slot-icon {
            width: 17px;
            height: 17px;
        }
    }
}
</style>