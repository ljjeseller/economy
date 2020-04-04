// import api from '@/api'
import { resetRouter } from '@/router'

const state = {
    token: '',
    nickname: '',
    avator: '',
    age: 0,
    roles: [],
}

const mutations = {
    UPDATE_USER_TOKEN(state, payload) {
        state.token = payload;
    },
    UPDATE_USER_INFO(state, userInfo) {
        const { nickname, avator, age, roles } = userInfo;

        state.nickname = nickname;
        state.avator = avator;
        state.age = age;
        state.roles = roles;
    },
    LOGOUT(state) {
        state.token = '';
        state.nickname = '';
        state.avator = '';
        state.age = 0;
        state.roles = [];
    },
}

const actions = {
    // userLogin({ commit }, payload) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
                
    //             const { token } = Promise.resolve(api.user.userLogin(payload));
    //             // const { token }  = await api.user.userLogin(payload);
    //             // console.log(token);
    //             commit('UPDATE_USER_TOKEN', token);
    //             resolve();
    //         } catch (e) {
    //             reject(e);
    //         }
    //     });
    // },
    // getUserInfo({ commit }) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const userInfo = await api.user.getUserInfo();
    //             commit('UPDATE_USER_INFO', userInfo);
    //             resolve();
    //         } catch (e) {
    //             reject(e);
    //         }
    //     });
    // },
    logout({ commit, dispatch }) {
        commit('LOGOUT');
        dispatch('permission/deleteRoutes', null, { root: true });
        resetRouter();
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
