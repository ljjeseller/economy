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
            <van-swipe class="my-swipe" @change="changeDate" indicator-color="white" :show-indicators="false" :loop="false">
                <van-swipe-item>
                    <div class="scroll-container">
                        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="下拉新增条目" loosing-text="下拉新增条目">
                            <van-cell :key="x" v-for="x in 10" title="单元格" value="内容" icon="location-o" />
                        </van-pull-refresh>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="scroll-container">
                        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="下拉新增条目" loosing-text="下拉新增条目">
                            <van-cell :key="x" v-for="x in 10" title="单元格" value="内容" icon="location-o" />
                        </van-pull-refresh>
                    </div>
                </van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
            </van-swipe>
        </div>

        <div @click="bbb" class="statistics"><van-icon name="chart-trending-o" /></div>

        <div @click="bbb" class="setting"><van-icon name="setting-o" /></div>

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

            cost: '',
            tagName: '名称',

            date: '',
        };
    },
    mounted() {
        this.date = dayjs().format('YYYY-MM-DD');
    },
    methods: {
        changeDate() {
            console.log('change date');
        },
        bbb() {
            this.$toast('coming soon');
            this.$router.push({ name: 'Login' });
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

            .my-swipe{
                height: 100%;

                .van-swipe-item {
                    background-color: #39a9ed;
                }

                .scroll-container{
                    margin: 0 3vw;
                    height: 100%;
                    overflow-y: auto;
                }
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
    }

    .setting{
        position: absolute;
        right: 4vw;
        bottom: 3vh;
        font-size: 4rem;
    }
</style>
