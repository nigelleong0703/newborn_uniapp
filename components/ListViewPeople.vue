<template name="ListViewPeople">
    <view>
        <scroll-view :style="{ height: scrollerHeight }" scroll-y="true" scroll-with-animation show-scrollbar="true">
            <view :id="'top' + tabItemIndex" style="width: 100%;height: 180upx;"></view>
            <view class='content'>
                <view v-for="(item, index) in tabItem_list" v-if="tabItem_list.length > 0" :key="index">
                    <profileCard :profile="item" buttonTitle="编辑" :type=type></profileCard>
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
        tabItemIndex: {
            type: Number,
            default: '',
        },
        type: {
            required: true,
            validator: function (value) {
                return ["nurse", "patient"].includes(value)
            }
        }
    },
    components: {
        profileCard
    },
    computed: {
        scrollerHeight: function () {
            return (uni.getSystemInfoSync().windowHeight - 50).toString() + 'px';
        }
    },

    data() {
        return {
            tabItem_list: []
        };
    },
    mounted() {
        uni.$on('refreshData_' + this.type + '_' + this.tabItemIndex.toString(), (res) => {
            this.refresh()
        })
    },
    onLoad() {
        if (this.type == 'nurse') {
            this.tabItem_list = this.$db.get('nurseList_' + this.tabItemIndex)
        } else {
            this.tabItem_list = this.$db.get('patientList_' + this.tabItemIndex)
        }
    },
    onShow() {
        this.refresh()
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
            if (this.tabItem_list != []) {
                this.tabItem_list.sort(function (x, y) {
                    return (x.name).localeCompare(y.name, "zh");
                })
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
    },
    watch: {
        tabItem_list: {
            handler(newName, oldName) {
            },
            immediate: true,
            deep: true,
        },
    }
}
</script>

<style>
@import url("/static/style/admin-home.css");
</style>
