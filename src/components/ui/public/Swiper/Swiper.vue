<template>
    <div class="swiper-wrapper" ref="mainDom">
        <div class="swiper-container" ref="domMain">
            <slot></slot>
            <!-- <div class="swiper-item bg1"></div>
            <div class="swiper-item bg2"></div>
            <div class="swiper-item bg3"></div> -->
        </div>
        <div class="dot-wrap" ref="dotWrap" v-if="showBottomDotted">
            <div class="dot" v-for="(item, index) in dotLen" :key="index" @click="clickDot(index)"></div>
        </div>
        <div class="arrow-wrap left" ref="leftBtn" @click="prev" v-if="showArrowButton">
            <div class="inAr"></div>
        </div>
        <div class="arrow-wrap right" ref="rightBtn" @click="next" v-if="showArrowButton">
            <div class="inAr"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'swiper',
        data() {
            return {
                dotLen: 0
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.domWrap = this.$refs.domMain;
                this.domWidth = this.$refs.domMain.clientWidth;
                this.domLen = this.dotLen = this.domWrap.children.length;
                this.interval = 10; // 位移间隔时间
                this.isAnimate = false;
                this.currentIndex = this.defaultIndex;
                const first = this.domWrap.children[0].cloneNode(true);
                const last = this.domWrap.children[this.domLen - 1].cloneNode(true);
                this.domWrap.insertBefore(last, this.domWrap.children[0]);
                this.domWrap.appendChild(first);
                this.domWrap.style.transform = `translate3d(-${this.domWidth * this.currentIndex}px, 0, 0)`;
                this.timer = 300;
                this.intev = 10;
                this.timeoutTimer = null;
                // optimize
                this.animateTimer = null;
                if (this.autoplay) {
                    this.play();
                }
                if (this.showBottomDotted) {
                    this.initDot();
                }
                this.initArrowBtn();
                this.bindMouseEvent();
            },
            animate(offset) {
                if (offset === 0) {
                    return;
                }
                this.isAnimate = true;
                const speed = offset / (this.timer / this.intev); // 偏移量
                const left = this.getLeft(this.domWrap) + offset;
                this.animateTimer = window.requestAnimationFrame(() => {
                    this.animateScrollFunc(speed, left);
                });
            },
            getLeft(target) {
                var x =
                    target.style.transform ||
                    target.style["-webkit-transform"] ||
                    target.style["-ms-transform"];
                x = x.substring(12);
                x = x.match(/(\S*)px/)[1];
                return Number(x);
            },
            setLeft(target, speed) {
                target.style.transform = `translate3d(${this.getLeft(this.domWrap) + speed}px, 0, 0)`;
                target.style["-webkit-transform"] = `translate3d(${this.getLeft(this.domWrap) + speed}px, 0, 0)`;
                target.style["-ms-transform"] = `translate3d(${this.getLeft(this.domWrap) + speed}px, 0, 0)`;
            },
            animateScrollFunc(speed, left) {
                if ((speed > 0 && this.getLeft(this.domWrap) < left) || (speed < 0  && this.getLeft(this.domWrap) > left)) {
                    this.setLeft(this.domWrap, speed);
                    setTimeout(() => {
                        this.animateTimer = window.requestAnimationFrame(() => {this.animateScrollFunc(speed, left)});
                    }, this.intev);
                } else {
                    window.cancelAnimationFrame(this.animateTimer);
                    this.resetScrollFunc(left);
                    this.isAnimate = false;
                }
            },
            resetScrollFunc(left) {
                this.domWrap.style.transform = `translated3d(${left}px, 0, 0)`;
                if (left > -this.domWidth) {
                    this.resetTransform(-(this.domWidth * this.domLen));
                }
                if(left < -(this.domWidth * this.domLen)) {
                    this.resetTransform(-this.domWidth);
                }
            },
            resetTransform(offset) {
                this.domWrap.style.transform = `translated3d(${offset}px, 0, 0)`;
                this.domWrap.style["-webkit-transform"] = `translate3d(${offset}px, 0, 0)`;
                this.domWrap.style["-ms-transform"] = `translate3d(${offset}px, 0, 0)`;
            },
            play() {
                this.timeoutTimer = setTimeout(() => {
                    if (this.forward) {
                        this.next();
                    } else {
                        this.prev();
                    }
                    this.play();
                }, this.delay)
            },
            next() {
                if (this.isAnimate) {
                    return;
                }
                if (this.currentIndex === this.domLen) {
                    this.currentIndex = 1;
                } else {
                    this.currentIndex++;
                }
                this.setDot();
                if (!this.isAnimate) {
                    this.animate(-this.domWidth);
                }
            },
            prev() {
                if (this.isAnimate) {
                    return;
                }
                if (this.currentIndex === 1) {
                    this.currentIndex = this.domLen;
                } else {
                    this.currentIndex--;
                }
                this.setDot();
                if (!this.isAnimate) {
                    this.animate(this.domWidth);
                }
            },
            initDot() {
                this.dotWrap = this.$refs.dotWrap;
                this.$nextTick(() => {
                    this.dotChild = Array.from(this.dotWrap.children);
                    this.dotChild[this.currentIndex -1].classList.add('on');
                });
            },
            setDot() {
                if (this.isAnimate) {
                    return;
                }
                for(let item in this.dotChild) {
                    if (Number(item) === this.currentIndex - 1) {
                        this.dotChild[Number(item)].classList.add('on');
                    } else {
                        this.dotChild[Number(item)].classList.remove('on');
                    }
                }
            },
            initArrowBtn() {
                this.leftBtn = this.$refs.leftBtn;
                this.rightBtn = this.$refs.rightBtn;
            },
            bindMouseEvent() {
                this.$refs.mainDom.addEventListener('mouseenter', () => {
                    // clear settimeout
                    if (this.showArrowButton) {
                        this.leftBtn.classList.add('show');
                        this.rightBtn.classList.add('show');
                    }
                    clearTimeout(this.timeoutTimer);
                }, false);
                this.$refs.mainDom.addEventListener('mouseleave', () => {
                    if (this.showArrowButton) {
                        this.leftBtn.classList.remove('show');
                        this.rightBtn.classList.remove('show');
                    }
                    if (this.autoplay) {
                        this.play();
                    }
                }, false);
            },
            clickDot(index) {
                const selectedDom = this.domWrap.children[index + 1];
                this.currentIndex = index + 1;
                this.setDot();
                this.resetTransform(`-${this.domWidth * (index + 1)}`);
            }
        },
        props: {
            forward: {
                type: Boolean,
                default: true
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            showArrowButton: {
                type: Boolean,
                default: false
            },
            showBottomDotted: {
                type: Boolean,
                default: false
            },
            delay: {
                type: Number,
                default: 4000
            },
            defaultIndex: {
                type: Number,
                default: 1
            }
        }
    }
</script>
<style lang="less" scoped>
    .swiper-wrapper {
        overflow: hidden;
        position: relative;
        height: 100%;
    }
    .swiper-container {
        display: flex;
        justify-content: flex-start;
        position: relative;
        flex-wrap: nowrap;
        height: 100%;
        // transition: all 500ms ease-in;
    }
    .swiper-item {
        width: 100%;
        flex-shrink: 0;
    }
    .bg1 { background: #e9e9ad; }
    .bg2 { background: #151342; }
    .bg3 { background: #d64040; }

    .dot-wrap {
        display: flex;
        flex-direction: row;
        position: absolute;
        padding: 10px;
        background: rgba(255, 255, 255, 0.5);
        left: 50%;
        bottom: 10px;
        transform: translate3d(-50%, 0, 0);
        border-radius: 10px;
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
            margin: 0 5px;
            cursor: pointer;

            &.on {
                background: #007fff;
            }
        }
    }
    .arrow-wrap {
        width: 75px;
        height: 75px;
        box-sizing: border-box;
        padding: 20px;
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        transform: translate3d(0, -50%, 0);
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        &:hover {
            .inAr{
                border-color: #007fff;
            }
        }
        .inAr {
            width: 30px;
            height: 30px;
            display: block;
            border: 3px solid #ccc;
            margin: auto;
            position: relative;
        }
        
        &.left {
            left: -85px;
            top: 50%;

            .inAr {
                border-right: transparent;
                border-top: transparent;
                transform: rotate(45deg);
                left: 7px;
            }
        }
        &.left.show {
            left: 10px;
        }
        &.right {
            right: -85px;
            top: 50%;

            .inAr {
                border-left: transparent;
                border-top: transparent;
                transform: rotate(-45deg);
                right: 7px;
            }
        }
        &.right.show {
            right: 10px;
        }
    }
</style>
