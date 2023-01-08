<template name="topTitleBar">
    <view class="topbar">
        <view :id="'top'" style="width: 100%;height: 50upx; max-height:10vh;"></view>
        <view class="top-title-bar">
            <view class="title">{{ title }}
            </view>
            <view class="add">
                <u-button class='add-button' @click="handleClick">{{ buttonTitle }}</u-button>
            </view>
        </view>
        <view :id="'top'" style="width: 100%;height: 50upx; max-height:10vh;"></view>
    </view>
</template>

<script>
export default {
    name: "topTitleBar",
    props: {
        title: {
            type: String,
            default: ''
        },
        buttonTitle: {
            type: String,
            default: ''
        },
    },
    data() {
        return {

        };
    },
    methods: {
        handleClick() {
            this.$emit('buttonClick');
        }
    }
}
</script>

<style>
.topbar {
    background-color: #ffaa00;
    width: 100%;
    z-index: 10;
    position: sticky;
    max-height: 25%;
}

.top-title-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.title {
    width: 60%;
    text-align: left;
    left: 20px;
    margin-left: 5%;
    font-size: 30px;
    font-weight: bold;
    color: #000000;
    margin-top: auto;
    margin-bottom: auto;
}

.add {
    width: 40%;
    align-items: center;
    justify-items: center;
    height: 100%;
    margin-top: auto;
    margin-bottom: auto;
}

.add-button {
    width: 70px;
    height: 30px;
    margin-right: 5vw;
    margin-left: auto;

}
</style>
