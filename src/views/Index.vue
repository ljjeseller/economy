<template>
    <div class="index-container" >
        <div class="header">
            <v-chart :options="lineChart"/>
        </div>

        <div class="tips">
            <span>{{date}}</span>
            <span>&yen; {{todayCost}}</span>
        </div>

        <div class="swiper">
            <swiper ref="mySwiper" :options="swiperOptions"  @slidePrevTransitionEnd="slidePrev" @slideNextTransitionEnd="slideNext">
                <swiper-slide :key="index" v-for="(swipe, index) in swipeData">
                    <div class="scroll-container">
                        <div class="scroll-border"></div>
                        <div class="scroll-border-shadow"></div>
                        <div class="scroll-content">
                            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="下拉新增条目" loosing-text="下拉新增条目">
                                <div class="scroll-content-inner">
                                    <!-- {{index}} -->
     
                                    <van-cell 
                                        :key="idx" 
                                        v-for="(item, idx) in swipe.costList" 
                                        :title="item.tags.tagName" 
                                        :value="item.cost" 
                                        :icon="item.tags.icon"
                                        v-longpress.prevent="deleteRecord(item)"
                                    />
                                    <div class="no-result" v-if="swipe.costList.length === 0"></div>
                                </div>
                            </van-pull-refresh>
                        </div>
                    </div>
                </swiper-slide>
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
            
            <van-swipe indicator-color="white" :loop="false">
                <van-swipe-item v-for="(section, index) in tagList" :key="index">
                    <van-grid clickable>
                        <van-grid-item v-for="(item, idx) in section.items" :key="idx" @click="clickTag(item)" :icon="item.icon" :text="item.name" />
                    </van-grid>
                </van-swipe-item>
            </van-swipe>
        </van-popup>

        <van-popup
            v-model="showStatistics"
            @open="statisticsCosts"
            position="bottom">
            
            <van-cell-group>
                <van-cell v-for="(month, index) in monthSum" :key="index" :title="month.month" :value="`${month.sum} 元`" />
                <van-cell title="总计" :value="`${yearCost} 元`" />
            </van-cell-group>
        </van-popup>

    </div>
</template>

<script>
import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

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
            tagName: '',
            tagId: 0,

            date: '',

            swipeData: [
                {
                    costList: [],
                },
                {
                    costList: [],
                },
                {
                    costList: [],
                },
            ],

            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                },
                loop : true,
                initialSlide: 1,
            },
            tagList : [],
            monthSum: [],
        };
    },
    computed: {
        ...mapGetters([
            'uid',
        ]),
        swiper() {
            return this.$refs.mySwiper.$swiper
        },
        todayCost() {
            let temp = '';
            this.swipeData.forEach((elem) => {
                if (elem.date === this.date) {
                    temp = elem.costList.reduce((accumulator, currentValue) => accumulator + Number(currentValue.cost), 0);
                }
            });
            return temp;
        },
        yearCost() {
            return this.monthSum.reduce((accumulator, currentValue) => accumulator + Number(currentValue.sum), 0);
        },
    },
    mounted() {
        this.date = dayjs().format('YYYY-MM-DD');
        this.findAllTags();

        // console.log(dayjs('2020-05-27').add(1, 'day'));
        this.initialize();
        this.findAndSumWeekRecord();
        
    },
    methods: {
        async initialize() {
            const today = dayjs().format('YYYY-MM-DD');
            const yesterday = dayjs(today).subtract(1, 'day').format('YYYY-MM-DD');
            const tomorrow = dayjs(today).add(1, 'day').format('YYYY-MM-DD');

            const todayData = await this.$api.costRecord.findAllRecord({ uid: this.uid, date: today });
            const yesterdayData = await this.$api.costRecord.findAllRecord({ uid: this.uid, date: yesterday });
            const tomorrowData = await this.$api.costRecord.findAllRecord({ uid: this.uid, date: tomorrow });

            // console.log(todayData);
            // console.log(yesterdayData);
            // console.log(tomorrowData);

            this.swipeData = [
                { date: yesterdayData.date, costList: yesterdayData.result.rows },
                { date: todayData.date, costList: todayData.result.rows },
                { date: tomorrowData.date, costList: tomorrowData.result.rows },
            ];
        },

        async findAndSumWeekRecord() {
            try {
                const params = {
                    uid: this.uid,
                    date: this.date,
                };
                const { weekSum } = await this.$api.costRecord.findAndSumWeekRecord(params);
                this.lineChart.series[0].data = weekSum;
            } catch (error) {
                this.$toast(error);
            }
        },

        async findAllRecord() {
            try {
                const params = {
                    uid: this.uid,
                    date: this.date,
                };
                const { date, result } = await this.$api.costRecord.findAllRecord(params);
                this.swipeData.forEach((elem) => {
                    if (elem.date === date) {
                        elem.costList = result.rows
                    }
                });
            } catch (error) {
                this.$toast(error);
            }
        },

        async findAllTags() {
            try {
                const params = {
                    uid: this.uid,
                };
                this.tagList = await this.$api.tag.findAllTags(params);
            } catch (error) {
                this.$toast(error);
            }
        },
        async slidePrev() {
            // console.log(this.swiper.realIndex);
            // console.log('slidePrev');
            const prevDate = dayjs(this.date).subtract(2, 'day').format('YYYY-MM-DD');
            
            const prevData = await this.$api.costRecord.findAllRecord({ uid: this.uid, date: prevDate });
            // console.log(prevData);

            // 0 > 2
            // 2 > 1
            // 1 > 0
            let targetIndex = 2
            if (this.swiper.realIndex > 0) {
                targetIndex = this.swiper.realIndex - 1;
            }

            this.swipeData[targetIndex] = { date: prevData.date, costList: prevData.result.rows };


            this.date = dayjs(this.date).subtract(1, 'day').format('YYYY-MM-DD')

            // console.log(this.swipeData);

            const weekDay = dayjs(this.date).day();
            if (weekDay === 0) {
                this.findAndSumWeekRecord();
            }
        },
        async slideNext() {
            // console.log(this.swiper.realIndex);
            // console.log('slideNext');
            const nextDate = dayjs(this.date).add(2, 'day').format('YYYY-MM-DD');
            
            const nextData = await this.$api.costRecord.findAllRecord({ uid: this.uid, date: nextDate });
            // console.log(nextData);

            // 2 > 0
            // 0 > 1
            // 1 > 2
            let targetIndex = 0
            if (this.swiper.realIndex < 2) {
                targetIndex = this.swiper.realIndex + 1;
            }

            this.swipeData[targetIndex] = { date: nextData.date, costList: nextData.result.rows };


            this.date = dayjs(this.date).add(1, 'day').format('YYYY-MM-DD')

            // console.log(this.swipeData);


            const weekDay = dayjs(this.date).day();
            if (weekDay === 1) {
                this.findAndSumWeekRecord();
            }
        },
        toSetting() {
            this.$router.push({ name: 'Setting' });
        },
        onRefresh() {
            this.isLoading = false;
            this.count++;
            this.show = true;
        },
        deleteRecord(item) {
            return () => {
                // console.log(item);
                this.$dialog.confirm({
                    title: '提示',
                    message: `确认删除 ${item.tags.tagName} ${item.cost} 的记录吗`,
                }).then(async () => {
                    const params = {
                        record_id: item.record_id,
                    };
                    await this.$api.costRecord.deleteRecord(params);
                    this.findAllRecord();
                }).catch(() => {});
            }
        },
        async submitCost() {
            if (this.cost === '') {
                this.$toast('cost is required');
                return false;
            }

            try {
                const params = {
                    uid: this.uid,
                    cost: this.cost,
                    tag_id: this.tagId,
                    datetime: this.date,
                };
                await this.$api.costRecord.addRecord(params);
                this.findAllRecord();
                this.cost = '';
                this.tagId = 0;
                this.show = false;
            } catch (error) {
                this.$toast(error);
                this.show = false;
            }
        },
        async statisticsCosts() {
            try {
                const params = {
                    uid: this.uid,
                    date: this.date,
                };
                const { monthSum } = await this.$api.costRecord.findAndSumMonthRecord(params);
                this.monthSum = monthSum;
            } catch (error) {
                this.$toast(error);
            }
        },
        clickTag(tag) {
            this.tagName = tag.name;
            this.tagId = tag.tag_id;
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

                .no-result{
                    padding: 100px;
                    background: #fff;
                    text-align: center;
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
