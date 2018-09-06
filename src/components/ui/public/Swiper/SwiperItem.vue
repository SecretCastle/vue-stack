<template>
    <div class="swiper-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'swiper-item'
    }
</script>

<style lang="less" scoped>
    .swiper-item {
        width: 100%;
        flex-shrink: 0;
    }
</style>
