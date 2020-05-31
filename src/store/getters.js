const getters = {
    token: state => state.user.token,
    uid: state => state.user.uid,
    roles: state => state.user.roles,
    permissionRoutes: state => state.permission.routes,
    currentPatient(state) {
        const { patients } = state.patient;
        let tempArr = [];
        if (patients.length) {
            patients.forEach((patient) => {
                if (patient.active) {
                    tempArr = patient;
                }
            })
        }
        return tempArr;
    },
    sideNavCollapse: state => state.app.sideNavCollapse,
}

export default getters
