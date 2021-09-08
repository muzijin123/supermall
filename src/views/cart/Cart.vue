<template>
  <div class="cart">
    <nav-bar><div slot="center">购物车{{cartLength}}</div></nav-bar> 
    
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartButtonBar.vue'
import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: { 
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(['cartLength','cartList'])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .cart{
    height: 100vh;
  }
</style>
