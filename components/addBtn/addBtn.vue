<template>
    <view>
        <view @click="gotoAdd" class="addBtn">
            <u-icon name="plus" color="#ffffff" size="40"></u-icon>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        url: {
            type: String
        },
        params: {
            type: Object
        }
    },
    data() {
        return {
            newUrl: '',
            parameters: '',
        };
    },
    methods: {
        gotoAdd: function () {
            if (this.params) {
                Object.entries(this.params).forEach((entry) => {
                    const [key, value] = entry;
                    this.parameters += key + '=' + value + '+'
                });
                this.parameters = this.parameters.slice(0, -1)
                this.newUrl = this.url + '?' + this.parameters
            } else {
                this.newUrl = this.url
            }
            if (this.newUrl) {
                console.log(this.newUrl)
                let temp = this.newUrl;
                this.newUrl = '';
                this.parameters = '';
                uni.navigateTo({
                    url: temp
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.addBtn {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: #ffaa00;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 200rpx;
    right: 35rpx;
    z-index: 200;
    box-shadow: 0 0 20rpx #999;
}

.addBtn:active {
    background-color: #cf8a00;
}
</style>
