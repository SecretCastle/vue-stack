<script>
import iVideo from '@/components/ui/public/iVideo';

export default {
    data() {
        return {
            videoJS: null
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
                breakpoint={10000}
                onIVideoJS={this.getInstance}
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
