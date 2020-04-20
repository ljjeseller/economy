<template>
    <div class="index-container" >
        <div class="header">
            <v-chart :options="lineChart"/>
        </div>

        <div class="tips">
            <span>{{date}}</span>
            <span>&yen; 99.99</span>
        </div>

        <div class="swiper" >

            <swiper ref="mySwiper" :options="swiperOptions"  @slideChangeTransitionEnd="changeDate">
                <swiper-slide :key="index" v-for="(swipe, index) in swipeData">
                    <div class="scroll-container">
                        <div class="scroll-border"></div>
                        <div class="scroll-border-shadow"></div>
                        <div class="scroll-content">
                            
                           
                                <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="下拉新增条目" loosing-text="下拉新增条目">
        
                                                                    
                                    <div class="scroll-content-inner">
                                        <van-cell :key="idx" v-for="(item, idx) in swipe.costList" :title="item.title" :value="item.cost" icon="location-o" />
                                    </div>
                                        
                                </van-pull-refresh>
                            
      
                        </div>

                    </div>
                </swiper-slide>
                <!-- <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide> -->

            </swiper>

        </div>

        <div @click="showStatistics=true" class="statistics"><van-icon name="chart-trending-o" /></div>

        <div @click="toSetting" class="setting"><van-icon name="setting-o" /></div>

        <van-number-keyboard
            v-model="cost"
            z-index="9999"
            :show="showKeyboard"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @blur="showKeyboard=false"
            @close="submitCost"
            
        />

        <van-popup
            v-model="show"
            position="top">
            
            <van-field
                v-model="cost"
                :label="tagName"
                placeholder="输入数字"
                input-align="right"
                type="number"
                readonly
                :border="false"
            />
            
            <van-swipe indicator-color="white">
                <van-swipe-item>
                    <van-grid clickable>
                        <van-grid-item @click="clickTag" icon="photo-o" text="文字" />
                        <van-grid-item @click="clickTag" icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />   
                    </van-grid>
                </van-swipe-item>
                <van-swipe-item>
                    <van-grid>
                        <van-grid-item @click="clickTag" icon="photo-o" text="文字" />
                        <van-grid-item @click="clickTag" icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />
                        <van-grid-item icon="photo-o" text="文字" />   
                    </van-grid>
                </van-swipe-item>
            </van-swipe>
            
        </van-popup>

        <van-popup
            v-model="showStatistics"
            position="bottom">
            
            <van-cell-group>
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
            </van-cell-group>
            
            
        </van-popup>

    </div>
</template>

<script>
import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'
import dayjs from 'dayjs'

export default {
    name: 'Login',
    components: {
        'v-chart': ECharts
    },
    data() {
        return {
            lineChart: {
                lineStyle: {
                    color: '#fff'
                },
                itemStyle: {
                    color: '#fff'
                },
                grid: {
                    top: '5%',
                    left: '0%',
                    right: '0%',
                    bottom: '18%',
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: ['Mon', 'Tue', 'Wen', 'Tur', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    show: false,
                    scale: true,
                },
                series: [{
                    data: [0, 11, 1, 222, 1290, 0, 1320],
                    type: 'line'
                }]
            },
            count: 0,
            isLoading: false,
            show: false,
            showKeyboard: false,
            showStatistics: false,

            cost: '',
            tagName: '名称',

            date: '',

            swipeData: [
                {
                    costList: [
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                    ],
                },
                {
                    costList: [
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                    ],
                },
                {
                    costList: [
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                        {
                            title: '水果',
                            cost: 99.99,
                        },
                    ],
                },
            ],

            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                },
                initialSlide: 1,
                // Some Swiper option/callback...
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
        }
    },
    mounted() {
        this.date = dayjs().format('YYYY-MM-DD');
    },
    methods: {
        changeDate(index) {
            console.log('change date'+ index);

            // this.swipeData.push(
            //     {
            //         costList: [
            //             {
            //                 title: '水果',
            //                 cost: 99.99,
            //             }
            //         ],
            //     }
            // );

            // this.swiper.removeSlide(0);
        },
        bbb() {
            this.$toast('coming soon');
            this.$router.push({ name: 'Login' });
        },
        toSetting() {
            this.$router.push({ name: 'Setting' });
        },
        onRefresh() {
            this.isLoading = false;
            this.count++;
            this.show = true;
        },
        submitCost() {
            this.show = false;
        },
        clickTag() {
            this.tagName = '标签';
            this.showKeyboard = true;
        },
    },
}
</script>

<style scoped lang="scss">
//  .doge {
//     width: 140px;
//     height: 72px;
//     margin-top: 8px;
//     border-radius: 4px;
//   }

    .index-container{
        position: relative;
        height: 100vh;
        background: #39a9ed;

        .swiper{
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 22vh;
            background: #fff;

            .swiper-container{
                height: 100%;
            }

            .swiper-slide{
                background-color: #39a9ed;
                // overflow-y: auto;
            }

            .scroll-container{
                position: relative;
                margin: 0 3vw;
                height: 100%;
                // overflow-y: auto;
            //    border-top: 50px solid #333;
            //    border-radius: 50px;
                .scroll-border{
                    top: 0;
                    left: 0;
                    right: 0;
                    position: absolute;
                    border: 40px solid #333;
                    border-radius: 40px;
                    z-index: 1;
                    box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
                }

                .scroll-border-shadow{
                    top: 20px;
                    left: 0;
                    right: 0;
                    position: absolute;
                    border-top: 20px solid #333;
                    border-radius: 40px;
                    z-index: 3;
                    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.5);
                }

                .scroll-content{
                    top: 50px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    position: absolute;
                    z-index: 2;
                    

                }

                .scroll-content-inner{
                    // margin-bottom: 50%;
                    background-color: #ccc;
                    box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
                }
                .scroll-content-inner:before{
                    content: '下拉新增条目';
                    position: absolute;
                    left: 0;
                    right:0;
                    top:-50vh;
                    height: 50vh;
                    background: #fff;
                    color: #333;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    font-size: 2rem;
                }
            }
            
            .van-pull-refresh{
                height: 100%;
                overflow-y: auto;
                margin: 0 3vw;
                // background-color: #fff;
                // box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
            }

            // .scroll-bg{
            //     height: 100%;
            //     overflow-y: auto;
            //     margin: 0 3vw;
            // }



            .no-more{
                padding: 20vh;
                background: #ccc;
            }
        }
    }


    .echarts {
        width: 100%;
        height: 16vh;
    }

    .tips{
        height: 6vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 4vw;
        font-size: 120px;
        font-weight: 700;
    }

    .statistics{
        position: absolute;
        left: 4vw;
        bottom: 3vh;
        font-size: 4rem;
        z-index: 1;
    }

    .setting{
        position: absolute;
        right: 4vw;
        bottom: 3vh;
        font-size: 4rem;
        z-index: 1;
    }
</style>
