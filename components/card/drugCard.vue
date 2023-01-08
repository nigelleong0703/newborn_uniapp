<template name="drugCard">
    <view class='card'>
        <view class="card-item card-item-view">
            <view class="first-title-smaller">
                {{ drugName }}
            </view>
        </view>
        <view class="card-item-edit">
            <u-button class='button card-button' plain color="orange" @click="editDrug" :text="buttonTitle">
            </u-button>
            <u-button class='button card-button' plain color="red" @click="deleteDrug" text="删除">
            </u-button>
        </view>
        <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="popup_show" mode="bottom" @close="close"
            @open="open" :closeable="true" :overlay="true">
            <view class="u-popup-slot">
                <view class="tips">
                    修改药品 - {{ drugName }}
                </view>
                <view class="form">
                    <u--form labelPosition="left" :model="editDrugForm" ref="editDrugForm">
                        <u-form-item prop="name" ref="item1">
                            <u--input v-model="editDrugForm.name" placeholder="请输入新的名称"></u--input>
                        </u-form-item>
                    </u--form>
                </view>
                <view class="confirm-button">
                    <u-button color='orange' type="primary" shape="circle" text="确定修改" @click="submit">
                    </u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
export default {
    name: 'drugCard',
    props: {
        profile: {
            type: Object,
            default: () => { }
        },
        buttonTitle: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            drugId: '',
            drugName: '',
            popup_show: false,
            editDrugForm: {
                name: '',
            },
            rules1: {
                'name': {
                    type: 'string',
                    required: true,
                    message: '请输入工具名称',
                    trigger: ['blur', 'change']
                }
            }
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.drugId = this.profile.id
            this.drugName = this.profile.name
        },
        editDrug() {
            this.popup_show = true;
        },
        deleteDrug() {
            uni.showModal({
                content: '是否要删除？',
                success: (res) => {
                    if (res.confirm) {
                        this.$request.deleteDrug(this.drugId)
                        uni.showToast({
                            title: "删除成功",
                            icon: 'none'
                        })
                        uni.$emit('changeData', {})
                    }
                }
            })
        },
        open() {
            this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
                if (this.popup_show == true) {
                    this.$refs.editDrugForm.setRules(this.rules1)
                }
            })
        },
        close() {
            this.popup_show = false
            this.editDrugForm = {
                name: '',
            }
        },
        submit() {
            let that = this
            that.$refs.editDrugForm.validate().then(res => {
                uni.showLoading({
                    title: '加载中'
                });
                that.$request.editDrug(this.drugId, this.editDrugForm).then(res => {
                    console.log(res)
                    uni.hideLoading()
                    if (res.statusCode !== 200) {
                        this.$.toast('提交失败');
                    } else {
                        uni.showToast({
                            title: "修改成功！",
                            duration: 1000,
                            success: () => {
                                setTimeout(() => {
                                    this.popup_show = false
                                }, 1000)
                                console.log('hi')
                                this.$emit('editSuccess');
                                that.drugName = that.editDrugForm.name
                            }
                        })
                    }
                })
            }).catch(errors => {
                uni.$u.toast('信息有误')
                console.log(errors)
            })
        },
    },
}
</script>

<style>
@import url("/components/card/card.css");
@import url("/static/css/popup-form.css");
</style>
