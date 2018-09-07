<template>
    <div class="swiper-area">
        <Swiper 
            :autoplay="true"
            :showBottomDotted="true"
            :showArrowButton="true"
            :defaultIndex="2"
        >
            <SwiperItem>
                <div style="background-color: #e9e9ad; width: 100%; height: 100%;"></div>
            </SwiperItem>
            <SwiperItem>
                <div style="background-color: #151342; width: 100%; height: 100%;"></div>
            </SwiperItem>
            <SwiperItem>
                <div style="background-color: #d64040; width: 100%; height: 100%;"></div>
            </SwiperItem>
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
