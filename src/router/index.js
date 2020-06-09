import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import vueg from 'vueg'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login  
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

Vue.use(vueg, router, {
    map: {
        'Index': {
            enter: ['Setting'],
        }
    }
});

export default router
