<template>
    <div id="app">
        <!-- <transition :name="transitionName"> -->
            <router-view class="child-view" v-transition></router-view>
        <!-- </transition> -->
    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                transitionName: 'slide-left',
            }
        },
        beforeRouteUpdate (to, from, next) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
            next()
        },
    };
</script>

<style>

</style>