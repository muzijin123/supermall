
import * as types from './mutation-type'

const actions = {
  addToCart(context,payload){
    return new Promise((resolve) =>{
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        context.commit(types.ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else{
        payload.count = 1
        context.commit(types.ADD_TO_CART,payload)
        resolve('添加了新的商品')
      } 
    })
  }
}
export default actions