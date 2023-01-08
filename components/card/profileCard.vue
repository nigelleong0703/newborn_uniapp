<template name="profileCard">
    <view class='card'>
        <view class="card-item card-item-view" @click="viewInfo">
            <view class="first-title">
                {{ firstLine }}
            </view>
            <view class="second-title">
                {{ secondLine }}
            </view>
        </view>
        <view class="card-item-edit">
            <u-button class='button card-button' plain color="orange" @click="editInfo" :text="buttonTitle">
            </u-button>
            <u-button class='button card-button' plain color="red" @click="deleteInfo" text="删除">
            </u-button>
        </view>
    </view>
</template>

<script>
export default {
    name: 'profileCard',
    props: {
        profile: {
            type: Object,
            default: () => { }
        },
        buttonTitle: {
            type: String,
            default: ''
        },
        type: {
            required: true,
            validator: function (value) {
                return ["nurse", "patient"].includes(value)
            }
        }

    },
    data() {
        return {
            firstLine: '',
            secondLine: '',
        }
    },
    mounted() {
        let gender = ''
        if (this.profile.gender == 1) {
            gender = '男';
        } else {
            gender = '女';
        }
        if (this.type == 'nurse') {
            this.firstLine = this.profile.name;
            this.secondLine = gender + ' ' + this.profile.tel
        } else {
            this.firstLine = this.profile.name;
            this.secondLine = gender + ' ' + uni.$u.timeFormat(this.profile.birthdate)
        }
    },
    methods: {
        viewInfo() {
            let viewUrl = '';
            if (this.type == 'nurse') {
                viewUrl = '/pages/admin/admin-nurse/admin-nurse-info';
            } else {
                viewUrl = '/pages/admin/admin-patient/admin-patient-info';
            }
            viewUrl = viewUrl + '?id=' + this.profile.id;
            uni.navigateTo({
                url: viewUrl,
            })
        },
        deleteInfo() {
            uni.showModal({
                content: '是否要删除？',
                success: (res) => {
                    if (res.confirm) {
                        if (this.type == 'nurse') {
                            this.$request.deleteNurse(this.profile.id)
                        } else {
                            this.$request.deletePatient(this.profile.id)
                        }
                        uni.showToast({
                            title: "删除成功",
                            icon: 'none'
                        })
                    }
                }
            })
        },
        editInfo() {
            let editUrl = '';
            if (this.type == 'nurse') {
                editUrl = '/pages/admin/admin-nurse/admin-nurse-info';
            } else {
                editUrl = '/pages/admin/admin-patient/admin-patient-info';
            }
            editUrl = editUrl + '?id=' + this.profile.id;
            uni.navigateTo({
                url: editUrl,
            })
        }
    }
}
</script>

<style>
@import url("/components/card/card.css");
</style>
