<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem.vue'
export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
  .cart-list {
    height: 100%;
  }
  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>