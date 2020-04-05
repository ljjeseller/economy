<template>
    <div class="home">
        <van-nav-bar
            title="设置"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div style="margin: 30px 16px;">
            <van-button round block type="danger" @click="logout">
                退出登录
            </van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Setting',
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            logout() {
                this.$router.push({ name: 'Login' });
            },
        },
    }
</script>
