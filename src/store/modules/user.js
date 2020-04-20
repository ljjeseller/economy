// import api from '@/api'
const state = {
    token: '',
    username: '',
    tags: '',
}

const mutations = {
    UPDATE_USER_TOKEN(state, payload) {
        state.token = payload;
    },
    UPDATE_USER_INFO(state, userInfo) {
        const { token, username, tags } = userInfo;
        state.token = token;
        state.username = username;
        state.tags = tags;
    },
    LOGOUT(state) {
        state.token = '';
        state.username = '';
        state.tags = '';
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
