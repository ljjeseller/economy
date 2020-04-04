import _ from 'lodash';

const state = {
    patients: [
        // {
        //     name: 'aaa',
        //     active: false,
        //     id: 1,
        // },
        {
            name: 'bbb',
            active: true,
            id: 2,
        },
        {
            name: 'ccc',
            active: false,
            id: 3,
        },
    ],
}

const mutations = {
    CHANGE_ACTIVE_PATIENT: (state, id) => {
        state.patients.forEach((patient) => {
            if (patient.id === id) {
                patient.active = true;
            } else {
                patient.active = false;
            }
        });
    },
    CLOSE_PATIENT(state, id) {
        const index = _.findIndex(state.patients, (o) => o.id === id);
        if (state.patients[index].active) {
            state.patients[0].active = true;
            state.patients.splice(index, 1);
        } else {
            state.patients.splice(index, 1);
        }
    },
}

const actions = {
    changeActivePatient({ commit }, id) {
        commit('CHANGE_ACTIVE_PATIENT', id);
    },
    closePatient({ commit }, id) {
        commit('CLOSE_PATIENT', id);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
