import Vue from 'vue'
import Vuex from 'vuex'
const path = require('path')
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
let modules = {};
files.keys().forEach(key => {
    let name = path.basename(key, '.js');
    modules[name] = files(key).default || files(key);
})

export default new Vuex.Store({
    modules,
    getters,
    plugins: [ 
        createPersistedState({ 
            storage: window.sessionStorage,
            paths: [
                'user',
                'patient',
            ], 
        }) 
    ],
})
