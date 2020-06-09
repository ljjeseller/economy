<template>
    <div class="home">
        <van-nav-bar
            title="设置"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="tag-container">
            <van-swipe indicator-color="white" :loop="false">
                <van-swipe-item v-for="(section, index) in tagList" :key="index">
                    <van-grid clickable>
                        <van-grid-item v-for="(item, idx) in section.items" :key="idx" :icon="item.icon" :text="item.name" />
                    </van-grid>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div style="margin: 30px 16px;">
            <van-button round block type="danger" @click="logout">
                退出登录
            </van-button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Setting',
        data() {
            return {
                tagList : [],
            }
        },
        computed: {
            ...mapGetters([
                'uid',
            ]),
        },
        mounted() {
            this.findAllTags();
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            logout() {
                this.$dialog.confirm({
                    title: '提示',
                    message: `确认退出吗`,
                }).then(async () => {
                    this.$router.push({ name: 'Login' });
                }).catch(() => {});
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
        },
    }
</script>

<style lang="scss" scoped>
    .tag-container{
        margin: 20px;
    }
</style>
