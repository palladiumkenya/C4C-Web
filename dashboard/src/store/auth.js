import axios from 'axios'

export default{
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    getters:{
        authenticated (state) {
            return state.token && state.user
        },
        user (state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_USER (state, data) {
            state.user = data
        },
    },
    actions: {
        async signIn({dispatch}, credentials ) {
            let response = await axios.post('auth/login',{
                email: credentials.email,
                password: credentials.password
            })
            // .then(response => response.json())
            // .then(json => console.log(json))
            // .catch(error => console.log(error.message));

            dispatch('attempt', response.data.access_token)
        },

        async attempt({commit}, token){
            commit('SET_TOKEN', token)

            try{
                let response = await axios.get('auth/user')

                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_USER', null),
                commit('SET_TOKEN', null)
            }
        }
    },
}
