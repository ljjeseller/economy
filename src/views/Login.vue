<template>
    <div class="login-container">
        <div class="logo">
            <img alt="logo" src="../assets/logo-white.png">
        </div>
    
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />

            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />

            <van-cell center title="自动登录">
                <template #right-icon>
                    <van-switch v-model="checked" size="24" />
                </template>
            </van-cell>

            <div style="margin: 30px 16px;">
                <van-button round block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>

        <div class="copy">2020 &copy; MysticLorrow All Right Reserved</div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                username: 'admin',
                password: '123456',
                checked: true,
            };
        },
        methods: {
            ...mapActions('user', [
                'updateUserInfo',
            ]),
            async onSubmit(values) {
                // console.log('submit', values);
                try {
                    const userInfo = await this.$api.user.userLogin(values);
                    this.updateUserInfo(userInfo);
                    this.$router.push({ name: 'Index' });
                } catch (error) {
                    this.$toast(error);
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .login-container{
        height: 100vh;
        position: relative;

        .logo{
            height: 35vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #1989fa;
        }

        .copy{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 2vh;
            text-align: center;
            font-size: 80px;
        }
    }
</style>
