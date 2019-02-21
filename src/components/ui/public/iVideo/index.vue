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
                <button class="custome-dom-buttons-cancel" onClick={cancel}>取消播放</button>
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
            hasBreak: false
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
            default: () => ([
                {
                    type: 'video/mp4',
                    src: 'http://qiniu.pic.ineet.cn/video/oceans.mp4'
                },
                {
                    type: 'video/webm',
                    src: 'http://qiniu.pic.ineet.cn/video/oceans.webm'
                }
            ])
        },
        breakpoint: {
            type: Number,
            default: 0
        }
    },
    methods: {
        /**
         * 初始化videojs
         */
        initVideo() {
            // 初始化
            if (this.$el) {
                this._options = Object.assign({}, defaultOptions, this.options);
                this.iVideojs = videojs(this.$refs.videoRef, this._options);
                // 抛出ivideo实例对象
                this.$emit('iVideoJS', this.iVideojs);
                // 绑定ready
                this.iVideojs.ready(() => {
                    // 监听事件
                    this.initEvent();
                });
            }
        },
        initEvent() {
            // 监听play事件
            this.iVideojs.on('play', this.onPlay);
            this.iVideojs.on('pause', this.onPause);
        },
        // play 事件
        onPlay() {
            this.showBreakPointDom = false;
            // 存在断点并且未断点
            if (this.breakpoint !==0 && !this.hasBreak) {
                clearTimeout(this.breakpointTimer);
                this.breakpointTimer = setTimeout(() => {
                    // 暂停
                    this.iVideojs.pause();
                    // this.iVideojs.reset();
                    // 现实dom
                    this.showBreakPointDom = true;
                    // 第一次break;
                    this.hasBreak = true;
                }, this.breakpoint);
            }
        },
        onPause() {
            if (this.breakpoint !== 0 && !this.hasBreak) {
                const stopTime = this.iVideojs.currentTime();
                
            }
        }
    },
    mounted() {
        this.initVideo();
    },
    beforeDestroy() {
        this.iVideojs = null;
        delete this.iVideojs;
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
            }
        }
    },
    render(h) {
        return (
            <div class="video-dom">
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
.video-dom {
    position: relative;
}
.video-js {
    .vjs-big-play-button {
        left: 50% !important;
        top: 50% !important;
        margin-left: -1.5em;
        margin-top: -0.75em;
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
