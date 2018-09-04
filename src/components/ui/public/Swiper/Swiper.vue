<template>
    <div class="swiper-wrapper">
        <div class="swiper-container" ref="domMain">
            <div class="swiper-item bg1"></div>
            <div class="swiper-item bg2"></div>
            <div class="swiper-item bg3"></div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'swiper',
        mounted() {
            // 获取children长度
            this.domLen = this.$refs.domMain.children.length;
            
        },
        props: {
            autoplay: {
                type: Boolean,
                default: false
            },
            showArrowButton: {
                type: Boolean,
                default: false
            },
            showBottomDotted: {
                type: Boolean,
                default: false
            },
            delay: {
                type: Number,
                default: 4000
            },
            defaultIndex: {
                type: Number,
                default: 1
            }
        }
    }
</script>

<style lang="less" scoped>
    .swiper-wrapper {
        overflow: hidden;
        position: relative;
        height: 100%;
    }
    .swiper-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        height: 100%;
    }
    .swiper-item {
        width: 100%;
        flex-shrink: 0;
    }
    .bg1 { background: #e9e9ad; }
    .bg2 { background: #151342; }
    .bg2 { background: #d64040; }
</style>
