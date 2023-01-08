<template name="tabBar_nurse">
    <u-tabbar v-model="current" :list="list" :mid-button="false" @change="changeTab" :safeAreaInsetBottom="true"
        :fixed="true" :placeholder="true" activeColor="#ffaa00">
        <u-tabbar-item v-for="(item, index) in list" :key="index" :text="item.text" @click="click1">
            <image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath"></image>
            <image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath"></image>
        </u-tabbar-item>
    </u-tabbar>
</template>


<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 0
        }
    },
    name: 'tabBar_nurse',
    data() {
        return {
            current: 0,
            list: [{
                iconPath: "/static/tabBar-nurse/about.png",
                selectedIconPath: "/static/tabBar-nurse/about_selected.png",
                text: '基本信息',
                customIcon: false,
                "pagePath": "pages/nurse/nurse-patient_info"
            },
            {
                iconPath: "/static/tabBar-nurse/transfusion.png",
                selectedIconPath: "/static/tabBar-nurse/transfusion_selected.png",
                text: '输液记录',
                customIcon: false,
                "pagePath": "pages/nurse/nurse-patient_transfusion"
            },
            {
                iconPath: "/static/tabBar-nurse/check.png",
                selectedIconPath: "/static/tabBar-nurse/check_selected.png",
                text: '巡视记录',
                customIcon: false,
                "pagePath": "pages/nurse/nurse-patient_check"
            }
            ],
        }
    },
    mounted() {
        this.current = this.currentPage;
        uni.hideTabBar();
    },
    methods: {
        changeTab(e) {
            uni.redirectTo({
                url: '/' + this.list[e].pagePath,
            })
        },
        click1(e) {
            this.changeTab(e)
        }
    }
}
</script>

<style>
.u-page__item__slot-icon {
    width: 50rpx;
    height: 50rpx;
    padding: 6rpx;
}
</style>
