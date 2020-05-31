// import api from '@/api'
const state = {
    token: '',
    username: '',
    tags: '',
    uid: 0,
}

const mutations = {
    UPDATE_USER_TOKEN(state, payload) {
        state.token = payload;
    },
    UPDATE_USER_INFO(state, userInfo) {
        const { token, username, tags, uid } = userInfo;
        state.token = token;
        state.username = username;
        state.tags = tags;
        state.uid = uid;
    },
    LOGOUT(state) {
        state.token = '';
        state.username = '';
        state.tags = '';
        state.uid = 0;
    },
}

const actions = {
    updateUserInfo({ commit }, userInfo) {
        commit('UPDATE_USER_INFO', userInfo);
    },
    logout({ commit }) {
        commit('LOGOUT');
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
