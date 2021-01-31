import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchText: '',
    loading: false,
    packages: [],
    limit: 10,
    totalItems: 0,
    totalPages: 1
  },
  mutations: {
    setPackages (state, packages) {
      state.packages = packages
    },
    setData(state, data) {
      state.packages = data.packages
      state.totalItems = data.totalItems
      state.totalPages = data.totalPages,
      state.searchText = data.searchText
    },
    setLoading(state,loading){
      state.loading = loading
    },
    clear(state){
      state.searchText =  ''
        state.packages = []
        state.totalItems = 0
        state.totalPages = 1
    }
  },
  actions: {
    searchPackage({ commit, state },text){
      commit('setLoading',true)
      Api.get('',{
        params: {
          text: text,
          from: 0,
          size: state.limit
        }
      })
      .then(({data}) => {
        let totalPages = Math.ceil(data.total / state.limit)
        commit('setData',{
          packages: data.objects,
          totalItems: data.total,
          totalPages: totalPages,
          searchText: text
        })
        commit('setLoading',false)
      }).catch(error => {
        console.log(error)
        commit('setLoading',false)
      })
    },
    paginate({ commit, state },page = 1){
      commit('setLoading',true)
      let from = state.totalPages > 1 ? (page - 1) * state.limit : 0
      axios.get('https://registry.npmjs.org/-/v1/search',{
        params: {
          text: state.searchText,
          from: from,
          size: state.limit
        }
      })
      .then(({data}) => {
        commit('setPackages',data.objects)
        commit('setLoading',false)
      }).catch(error => {
        console.log(error)
        commit('setLoading',false)
      })
    },
    clearData({ commit, state }){
      commit('clear')
    }
  },
  getters: {
    // ...
    getPackage: (state) => (name) => {
      return state.packages.find(item => item.name === name)
    }
  }
})
