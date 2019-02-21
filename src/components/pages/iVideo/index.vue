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
        }
    },
    mounted() {
        
    },
    render(h) {
        return(
            <iVideo
                breakpoint={5000}
                onIVideoJS={this.getInstance}
                url={this.url}
                options={
                    {
                        width: '1200px'
                    }
                }
                poster={this.poster}
            >
                <div class="button-area">
                    <button onClick={this.clickFn}>click me</button>
                </div>
            </iVideo>
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
</style>
