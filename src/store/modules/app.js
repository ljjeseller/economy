const state = {
    sideNavCollapse: false,
}

const mutations = {
    TOGGLE_SIDE_NAV(state) {
        state.sideNavCollapse = !state.sideNavCollapse;
    }
}

const actions = {
    toggleSideNav({ commit }) {
        commit('TOGGLE_SIDE_NAV');
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
