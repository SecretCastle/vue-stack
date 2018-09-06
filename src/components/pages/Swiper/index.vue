<template>
    <div class="swiper-area">
        <Swiper 
            :autoplay="true"
            :showBottomDotted="true"
            :showArrowButton="true"
        >
            <SwiperItem>1</SwiperItem>
            <SwiperItem>2</SwiperItem>
            <SwiperItem>3</SwiperItem>
        </Swiper>
    </div>
</template>

<script>
    import { Swiper, SwiperItem } from '@/components/ui/public/Swiper';
    export default {
        components: {
            Swiper,
            SwiperItem
        }
    }
</script>

<style lang="less" scoped>
    .swiper-area {
        height: 400px;
        position: relative;
    }
</style>
