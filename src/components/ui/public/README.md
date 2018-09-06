# Vue-stack public components `Training`

> Swiper

`Swiper`组件，轮播的组件

```vue
<Swiper
    :autoplay="false"
    :showArrowButton="false"
    :showBottomDotted="false"
    :delay="4000"
    :defaultIndex="1"
    :forward="true"
>
    <SwiperItem>content1</SwiperItem>
    <SwiperItem>content2</SwiperItem>
    <SwiperItem>content3</SwiperItem>
</Swiper>
```

| 参数 | 默认值 | 说明 |
| ---- | ---- | ---- |
| autoplay | false | 是否开启自动播放 |
| showArrowButton | false | 是否显示左右箭头 |
| showBottomDotted | false | 是否显示 |
| delay | 4000 | 延迟 |
| defaultIndex | 1 | 默认初始化显示的页数 |
| forward | true | true:向右 false: 向左 |