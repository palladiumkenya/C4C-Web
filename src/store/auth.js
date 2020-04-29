import axios from 'axios'
let users_data = []

export default{
  namespaced: true,
  state: {
    token: null,
    user: {},
    exp: [],
    us_all: null,
    us_no: 0,
    link_next: null
  },
  getters: {
    authenticated (state) {
      return state.token && state.user
    },
    user (state) {
      return state.user
    },
    expo (state) {
      return state.exp
    },
    us_all (state) {
      return state.us_all
    },
    us_no (state) {
      return state.us_no
    },
    next_link (state) {
      return state.link_next
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, data) {
      state.user = data
    },
    SET_EXP (state, data) {
      state.exp = data
    },
    SET_US_DATA (state, data) {
      state.us_all = data
    },
    SET_US_NO (state, data) {
      state.us_no = data
    },
    SET_LINK (state, data) {
      state.link_next = data
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
        if (response.data.data.role_id !== 3) {
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
        commit('SET_US_DATA', null)
        commit('SET_EXP', [])
        commit('SET_LINK', null)
        commit('SET_US_NO', 0)
      })
    },
    storeExp ({ commit }, exposures) {
      commit('SET_EXP', exposures)
    },
    storeUser ({ commit }, us) {
      commit('SET_US_DATA', us)
    },
    storeUsNo ({ commit }, us_no) {
      commit('SET_US_NO', us_no.meta.total)
      commit('SET_LINK', us_no.links.next)
    }
  }
}
