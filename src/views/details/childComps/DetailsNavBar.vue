<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(value,key) in titles" :key="key" class="title-item" :class="{active: key === currentIndex}" @click="titleClick(key)">
        {{value}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:"DetailsNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(key){
      this.$emit("titleClick",key)
    },
    backClick(){
      this.$router.back()
    }
  }

  
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex:1
  }
  .active{
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>