<template>
    <view class="body">
        <topTitleBar :title="title" buttonTitle="增加" @buttonClick="popup_show = true"></topTitleBar>
        <view class='content'>
            <view :id="'top'" style="width: 100%;height: 50upx"></view>
            <view>
                <view v-if="vein_list.length > 0">
                    <view v-for="(item, index) in vein_list" :key="index">
                        <veinCard :profile="item" buttonTitle="修改" @editSuccess="editSuccess"></veinCard>
                    </view>
                    <view class='endOfList'>
                        已到达最底部啦！
                    </view>
                </view>
                <view class='noCard' v-if="vein_list.length === 0">
                    暂无信息
                </view>
                <view style="width: 100%;height: 150upx;opacity:0;"></view>
            </view>
            <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show" mode="bottom"
                @close="close" @open="open" :closeable="true" :overlay="true">
                <view class="u-popup-slot">
                    <view class="tips">
                        添加静脉
                    </view>
                    <view class="form">
                        <u--form labelPosition="left" :model="newVeinForm" ref="newVeinForm">
                            <u-form-item prop="name" ref="item1">
                                <u--input v-model="newVeinForm.name" placeholder="请输入要添加的静脉名称"></u--input>
                            </u-form-item>
                        </u--form>
                    </view>
                    <view class="confirm-button">
                        <u-button color='orange' type="primary" shape="circle" text="确定添加" @click="addVein">
                        </u-button>
                    </view>
                </view>
            </u-popup>
        </view>
    </view>
</template>

<script>
import common from "common/js/common.js"
import veinCard from "components/card/veinCard"
import topTitleBar from "components/topTitleBar/topTitleBar"

let scrollTimer = false,
    tabBar;

export default {
    components: {
        veinCard
    },
    data() {
        return {
            title: '静脉列表',
            bdlLoading: true,
            popup_show: false,
            popup_show_edit: false,
            vein_list: [],
            onloading: true,
            windowHeight: '',
            newVeinForm: {
                name: '',
            },
            editName: '',
            rules1: {
                'name': {
                    type: 'string',
                    required: true,
                    message: '请输入静脉名称',
                    trigger: ['blur', 'change']
                }
            }
        }
    },

    onReady() { },

    async onLoad() {
        this.$request.checkLogin();
        this.windowHeight = uni.getSystemInfoSync().windowHeight;
        console.log(this.windowHeight)
        this.initData();
        uni.$on('changeData', (res) => {
            this.initData()
        })
    },

    onUnload() {
        uni.$off('changeData');
    },

    methods: {
        initData() {
            uni.showLoading({
                title: '加载中...',
                mask: true
            })
            this.$request.getVeinList().then(res => {
                uni.hideLoading();
                console.log(res)
                this.vein_list = res.data
            })
        },

        open() {
            this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
                if (this.popup_show == true) {
                    this.$refs.newVeinForm.setRules(this.rules1)
                }
            })
        },
        close() {
            this.popup_show = false
        },

        addVein() {
            let that = this
            that.$refs.newVeinForm.validate().then(res => {
                console.log(that.newVeinForm)
                uni.showLoading({
                    title: '加载中'
                });
                that.$request.addVein(that.newVeinForm).then(res => {
                    uni.hideLoading()
                    console.log(res)
                    if (res.statusCode !== 200) {
                        this.$.toast('提交失败');
                    } else {
                        uni.showToast({
                            title: "添加成功！",
                            duration: 1000,
                            success: () => {
                                setTimeout(() => {
                                    that.popup_show = false
                                }, 1000)
                            }
                        })
                        uni.$emit('changeData', {})
                    }
                })

            }).catch(errors => {
                uni.$u.toast('信息有误')
                console.log(errors)
            })
        },
        editSuccess() {
            console.log("hihi")
            uni.$emit('changeData', {})
        },
    }
}
</script>

<style lang='scss'>
@import url("/static/css/popup-form.css");

.body {
    overflow: scroll;
    color: #6B8082;
    position: relative;
}

.content {
    margin-left: 5%;
    margin-right: 5%;
}

.noCard {
    width: 90%;
    height: 200upx;
    margin: auto;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
    box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.10);
    border-radius: 10upx;
}

.endOfList {
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 18px;
}
</style>
