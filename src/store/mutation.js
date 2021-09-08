import * as types from './mutation-type'

const mutations = {
  [types.ADD_COUNTER](state,payload){
    payload.count++
  },

  [types.ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}

export default mutations