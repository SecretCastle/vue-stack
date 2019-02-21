<template>
    <div class="main-container">
        <router-link to="/">首页</router-link>
        <router-link to="/swiper">轮播图</router-link>
        <router-link to="/editor">富文本编辑器</router-link>
        <router-link to="/video">iVideo</router-link>
        <transition name="slide-left">
            <div class="display-area">
                <router-view />
            </div>
        </transition>
    </div>
    
</template>

<script>
    export default {
       
    }
</script>

<style lang="less" scoped>
    .slide-right,
    .slide-left {
        position: absolute;
        left: 0;
        right: 0;
    }
    .slide-left-enter-active {
    transition: all 0.4s ease;
    }
    .slide-left-leave-active {
        transition: all 0.2s cubic-bezier(2, 0.5, 0.8, 1);
    }
    .slide-left-enter {
        left: 0;
        right: 0;
        transform: translateX(300px);
        opacity: 0;
    }
    .slide-left-leave-to {
        left: 0;
        right: 0;
        opacity: 0;
    }
    .slide-right-enter-active {
        transition: all 0.2s ease;
    }
    .slide-right-leave-active {
        transform: translateX(300px);
        transition: all 0.3s ease-out;
    }
    .slide-right-enter {
        left: 0;
        right: 0;
        opacity: 0;
    }
    .slide-right-leave-to {
        left: 0;
        right: 0;
        opacity: 0;
    }
    .main-container {
        width: 1200px;
        margin: 0 auto;
    }
    .display-area {
        margin-top: 20px;
    }
</style>


