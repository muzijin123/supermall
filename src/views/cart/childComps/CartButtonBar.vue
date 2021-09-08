<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="isSelectAll" @click.native = "checkBtnClick"></CheckButton>
    <span >全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartLength}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
  name:"CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList','cartLength']),
    totalPrice(){
      return this.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.price * item.count
      },0)
    },
    isSelectAll(){
      if(this.cartLength === 0) return false
      return this.cartList.find(item => item.checked === false) === undefined
    }
  },
  methods:{
    checkBtnClick(){
      if(this.isSelectAll){
        this.cartList.forEach(element => element.checked = false);
      }else{
        this.cartList.forEach(element => element.checked = true);
      }
    }
  }
}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

    .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>