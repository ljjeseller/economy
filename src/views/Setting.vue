<template>
    <div class="Setting">
        <van-nav-bar
            title="设置"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="tag-container">
            <van-cell-group>
                <van-cell title="标签管理" />
            </van-cell-group>

            <van-grid clickable>
                <van-grid-item v-for="(item, idx) in tagList" :key="idx" :icon="item.icon" :text="item.name" />
                <van-grid-item @click="showAddTag=true" icon="plus" text="添加" />
            </van-grid>
        </div>

        <van-cell-group>
            <van-cell title="版本号" :value="version" />
        </van-cell-group>

        <div class="btn-container">
            <van-button color="#39a9ed" round block type="danger" @click="logout">
                退出登录
            </van-button>
        </div>


        <van-popup
            v-model="showAddTag"
            position="bottom">

            <van-field
                v-model="tagName"
                label="标签名称"
                placeholder="最多四个字"
                input-align="right"
                :border="false"
            />
            
            <van-grid clickable class="icon-container">
                <van-grid-item @click="toggleActive(item)" :class="item.active ? 'active' : ''" v-for="(item, idx) in iconList" :key="idx" :icon="item.name" />
            </van-grid>

            <div class="icon-btn">
                <van-button color="#39a9ed" round block type="danger" @click="logout">
                    添加标签
                </van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { version } from '../../package.json'

    export default {
        name: 'Setting',
        data() {
            return {
                tagList : [],
                version,

                showAddTag: false,
                tagName: '',
                iconList: [
                    { active: false, name: 'location-o' },
                    { active: false, name: 'like-o' },
                    { active: false, name: 'star-o' },
                    { active: false, name: 'phone-o' },
                    { active: false, name: 'setting-o' },
                    { active: false, name: 'fire-o' },
                    { active: false, name: 'coupon-o' },
                    { active: false, name: 'cart-o' },
                    { active: false, name: 'friends-o' },
                    { active: false, name: 'comment-o' },
                    { active: false, name: 'gem-o' },
                    { active: false, name: 'gift-o' },
                ],
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
                    this.tagList = await this.$api.tag.findAllTags(params, true);
                    // console.log(this.tagList);
                } catch (error) {
                    this.$toast(error);
                }
            },
            toggleActive(item) {
                this.iconList.forEach((icon) => {
                    if (icon.name === item.name) {
                        icon.active = true;
                    } else {
                        icon.active = false;
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .tag-container{
        margin: 60px 0;

        h1 {
            margin: 120px;
            font-size: 80px;
        }
    }

    .btn-container{
        margin: 480px 120px;
    }

    .icon-btn{
        margin: 180px 120px;
    }

    .icon-container{
        margin-top: 80px;
    }
    .active{
        color: #39a9ed;
    }
</style>
