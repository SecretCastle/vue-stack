<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import defaultOptions from './defaultOptions';
import './custome';

// 有暂停点的情况下，默认的dom
const breakPointDom = (h, that) => {
    const iVideojs = that.iVideojs;
    const cancel = () => {
        that.showBreakPointDom = false;
    }
    const continuePlay = () => {
        iVideojs.play();
    }
    return (
        <div class="custome-dom">
            <div class="custome-dom-buttons">
                <button class="custome-dom-buttons-cancel" onClick={cancel}>重新播放</button>
                <button class="custome-dom-buttons-continue" onClick={continuePlay}>继续播放</button>
            </div>
        </div>
    )
}

export default {
    data() {
        return {
            _options: {},
            breakpointTimer: null,
            showBreakPointDom: false,
            hasBreak: false,
            playedTime: 0
        }
    },
    props: {
        options: {
            type: Object,
            required: false,
            default: () => ({})
        },
        url: {
            type: Array,
            required: false,
            default: () => ([])
        },
        breakpoint: {
            type: Number,
            default: 0
        },
        poster: String,
        autoplay: Boolean
    },
    methods: {
        /**
         * 初始化videojs
         */
        initVideo() {
            // 初始化
            if (this.$el) {
                if (this.autoplay) {
                    defaultOptions.muted = true;
                }
                this._options = Object.assign({}, defaultOptions, this.options);
                // 实例化对象
                this.iVideojs = videojs(this.$refs.videoRef, this._options);
                // 设置第一针封面
                if (this.poster) {
                    this.iVideojs.poster(this.poster);
                }
                // 抛出ivideo实例对象
                this.$emit('iVideoJS', this.iVideojs);
                // 绑定ready
                this.iVideojs.ready(() => {
                    // 监听事件
                    this.initEvent();
                    if (this.autoplay) {
                        this.iVideojs.play();
                    }
                });
            }
        },
        initEvent() {
            // 监听play事件
            this.iVideojs.on('play', this.onPlay);
            // 监听暂停事件
            this.iVideojs.on('pause', this.onPause);
            // 监听播放完成事件
            this.iVideojs.on('ended', this.onEnded);
        },
        // play 事件
        onPlay() {
            this.showBreakPointDom = false;
            // 存在断点并且未断点
            if (this.breakpoint !==0 && !this.hasBreak) {
                if (this.breakpoint - this.playedTime > 0) {
                    clearTimeout(this.breakpointTimer);
                    this.breakpointTimer = setTimeout(() => {
                        // 暂停
                        this.iVideojs.pause();
                        // 现实dom
                        this.showBreakPointDom = true;
                        // 第一次break;
                        this.hasBreak = true;
                    }, this.breakpoint - this.playedTime);
                }
            }
        },
        // 暂停事件
        onPause() {
            if (this.breakpoint !== 0 && !this.hasBreak) {
                // 保存点击暂停时间
                const stopTime = this.iVideojs.currentTime();
                this.playedTime = stopTime * 1000;
            }
        },
        // 播放完成事件
        onEnded() {
            if (this.breakpointTimer !== null) {
                clearTimeout(this.breakpointTimer);
            }
        }
    },
    mounted() {
        this.initVideo();
    },
    beforeDestroy() {
        // 销毁前初始化参数
        this.iVideojs = null;
        delete this.iVideojs;
        this.hasBreak = false;
        this.playedTime = 0;
    },
    watch: {
        /**
         * 监听url变化，video对象中替换视频源
         */
        url(newVal, oldVal) {
            if (newVal) {
                this.iVideojs.reset();
                newVal.forEach(item => {
                    // 替换视频源
                    this.iVideojs.src(item);
                });
                this.showBreakPointDom = false;
                this.hasBreak = false;
                this.initEvent();
                if (this.autoplay) {
                    this.iVideojs.play();
                }
            }
        },
        /** 
         * 监听封面针变化，video对象中替换封面针
        */
        poster(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.iVideojs.poster(newVal);
            }
        }
    },
    render(h) {
        return (
            <div class="i-video-dom">
                <video 
                    ref="videoRef"
                    id="my_video_1" 
                    class="video-js video-pc"
                    controls 
                    preload="auto"
                >
                    {
                        // 渲染初始化url
                        this.url.map(item => {
                            return (
                                <source src={item.src} type={item.type} />
                            )
                        })
                    }
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                    </p>
                </video>
                {
                    // 判断是否存在断点
                    this.breakpoint !== 0 && this.showBreakPointDom && 
                    <div class="video-modal">
                        {
                            this.$slots.default && this.$slots.default[0] ? this.$slots.default[0] : breakPointDom(h, this)
                        }
                    </div>
                }
            </div>
            
        )
    }
}
</script>

<style lang="less">
.i-video-dom {
    position: relative;
}
.video-js {
    .vjs-big-play-button {
        left: 50% !important;
        top: 50% !important;
        margin-left: -1.5em;
        margin-top: -0.75em;
    }
    // 默认屏蔽全屏按钮
    .vjs-fullscreen-control {
        display: none;
    }
}
.video-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    top: 0;
    left: 0;
}
</style>
