const state = {
    routes: [],
}

const mutations = {
    UPDATE_ROUTES(state, routes) {
        state.routes = routes;
    },
    DELETE_ROUTES() {
        state.routes = [];
    },
}

const actions = {
    updateRoutes({ commit }, routes) {
        commit('UPDATE_ROUTES', routes);
    },
    deleteRoutes({ commit }) {
        commit('DELETE_ROUTES');
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
