import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import getters from './getter'
import mutations from './mutation'

Vue.use(Vuex)

const state = {
	cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store