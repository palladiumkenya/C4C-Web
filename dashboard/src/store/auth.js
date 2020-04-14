import axios from 'axios'

export default{
  namespaced: true,
  state: {
    token: null,
    user: {}
  },
  getters: {
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
    }
  },
  actions: {
    async signIn ({ dispatch }, credentials) {
      let response = await axios.post('auth/login', {
        email: credentials.email,
        password: credentials.password
      })
      dispatch('attempt', response.data.access_token)
    },

    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }
      try {
        let response = await axios.get('auth/user')
        // if (response.data.data === undefined) {
        //   console.log('failed')
        //   commit('SET_USER', null)
        //   commit('SET_TOKEN', null)
        // } else 
        if (response.data.data.role_id != 3) {
            commit('SET_USER', response.data.data)
        } else if (response.data.data.role_id === 3) {
            console.log('failed 3')
            commit('SET_USER', null)
            commit('SET_TOKEN', null)
        } else {
          commit('SET_USER', response.data.data)
        }
      } catch (e) {
        console.log('failed')
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
      }
    },
    signout ({ commit }) {
      return axios.get('auth/logout').then(() => {
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
      })
    }
  }
}
