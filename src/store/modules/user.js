export default {
    state: {
        credentials: {
            id: '',
            email: '',
            numeroDocumento: '',
            razonSocial: '',
        }
    },
    getters: {},
    mutations: {
        setAuthentication(state, status) {
            state.credentials.id = status.id;
            state.credentials.email = status.email;
            state.credentials.numeroDocumento = status.numeroDocumento;
            state.credentials.razonSocial = status.razonSocial;
        }
    },
    actions: {}
}