<template>
  <div>
    <swiper class="details-swiper">
      <swiper-item v-for="(item,key) in topImages" :key="key">
        <img :src="item" alt=""/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
  name:"DetailsSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
  
}
</script>

<style scoped>
  .details-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>