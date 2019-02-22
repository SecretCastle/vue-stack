<script>
import iVideo from '@/components/ui/public/iVideo';

export default {
    data() {
        return {
            videoJS: null,
            url: [
                {
                    type: 'video/mp4',
                    src: 'http://qiniu.pic.ineet.cn/video/oceans.mp4'
                },
                {
                    type: 'video/webm',
                    src: 'http://qiniu.pic.ineet.cn/video/oceans.webm'
                }
            ],
            poster: 'http://qiniu.media.ineet.cn/images/jpg/DSC_1348.JPG'
        }
    },
    components: {
        iVideo
    },
    methods: {
        // 初始化获得video实例
        getInstance(instance) {
            this.videoJS = instance;
        },
        // 点击事件
        clickFn() {
            setTimeout(() => {
                this.videoJS.play();
            }, 2000)
        },
        clickItemFn(url, poster) {
            this.url = url;
            this.poster = poster;
        }
    },
    mounted() {
        
    },
    render(h) {
        return (
            <div class="video-dom">
                <iVideo
                    onIVideoJS={this.getInstance}
                    url={this.url}
                    options={
                        {
                            width: '1200px'
                        }
                    }
                    poster={this.poster}
                    autoplay={false}
                >
                    <div class="button-area">
                        <button onClick={this.clickFn}>click me</button>
                    </div>
                </iVideo>
                <div class="video-list">
                    <div class="video-list-item" onClick={() => this.clickItemFn([{ 
                            type: 'video/ogg', 
                            src: 'http://qiniu.media.ineet.cn/movie.ogg' 
                        }], 'http://qiniu.pic.ineet.cn/image/jpg/blog-bg.jpg')}>
                        <img src="http://qiniu.pic.ineet.cn/image/jpg/blog-bg.jpg" />
                    </div>
                    <div class="video-list-item" onClick={() => this.clickItemFn(
                        [{ 
                            type: 'video/ogg', 
                            src: 'http://qiniu.media.ineet.cn/movie.ogg' 
                        }],
                        'http://qiniu.media.ineet.cn/images/jpg/welcome-cover.jpg'
                    )}>
                        <img src="http://qiniu.media.ineet.cn/images/jpg/welcome-cover.jpg" />
                    </div>
                    <div class="video-list-item" onClick={() => this.clickItemFn(
                        [{
                            type: 'video/mp4',
                            src: 'http://qiniu.pic.ineet.cn/video/oceans.mp4'
                        },
                        {
                            type: 'video/webm',
                            src: 'http://qiniu.pic.ineet.cn/video/oceans.webm'
                        }],
                        'http://qiniu.media.ineet.cn/images/jpg/index-banner.jpg'
                    )}>
                        <img src="http://qiniu.media.ineet.cn/images/jpg/index-banner.jpg" />
                    </div>
                </div>
            </div>
            
        )
    }
}
</script>

<style lang="less" scoped>
.button-area {
    text-align: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}
.video-list {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    &-item {
        width: 32.333%;
        height: 250px;
        cursor: pointer;
        overflow: hidden;
        transition: all 200ms ease-in-out;
        img {
            width: 100%;
            height: 250px;
            transition: all 500ms ease-in-out;
        }
    }
    &-item:hover {
        box-shadow: 0 0 10px #000;
        img {
            transform: scale(1.1);
        }
    }
}
</style>
