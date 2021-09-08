<template>
  <div id="detail">
    <details-nav-bar class="detail-nav" @titleClick="titleClick" ref="dnav"/>
    <scroll ref="scroll" class="content" @scroll="contentScoll" :probe-type="3">
      <details-swiper :topImages="topImages"/>
      <details-base-info :goods="goods"/>
      <details-shop :shop="shop"/>
      <details-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <details-param ref="params" :paramInfo="goodsParam"/>
      <details-comment ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="goodsList"/>
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
    <toast :message="message" :isShow="isShow"/>
    <details-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailsNavBar from "views/details/childComps/DetailsNavBar"
import DetailsSwiper from "views/details/childComps/DetailsSwiper"
import DetailsBaseInfo from "views/details/childComps/DetailsBaseInfo"
import DetailsShop from "views/details/childComps/DetailsShop"
import DetailsGoodsInfo from "views/details/childComps/DetailsGoodsInfo"
import Scroll from 'components/common/scroll/Scroll.vue'
import DetailsParam from 'views/details/childComps/DetailsParam'
import DetailsComment from 'views/details/childComps/DetailsComment'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailsBottomBar from 'views/details/childComps/DetailsBottomBar'
import BackTop from 'components/content/backtop/BackTop'
import Toast from 'components/common/toast/Toast'
import {debounce} from 'common/utils'
import {backTopMixin} from 'common/mixin'
import {getDetails,getRecommend,Goods,Shop,GoodsParam} from "network/details.js"

export default {
  name:"Details",
  components: { 
    DetailsNavBar,
    DetailsSwiper,
    DetailsBaseInfo,
    DetailsShop,
    Scroll,
    DetailsGoodsInfo,
    DetailsParam,
    DetailsComment,
    GoodsList,
    DetailsBottomBar,
    BackTop,
    Toast
  },
  mixins:[backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      goodsParam:{},
      commentInfo:{},
      goodsList:[],
      themeTop:[],
      currentIndex: 0,
      getThemeTopY:null,
      message:"" ,
      isShow:false
    }
  },
  created(){
    this.iid = this.$route.params.iid;
    getDetails(this.iid).then(res =>{
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo,
      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if(data.rate.list){
        this.commentInfo = data.rate.list[0];
      }
    })
    getRecommend().then(res =>{
      this.goodsList = res.data.list
    })

    this.getThemeTopY = debounce(()=>{
      this.themeTop=[];
      this.themeTop.push(0)
      this.themeTop.push(this.$refs.params.$el.offsetTop)
      this.themeTop.push(this.$refs.comment.$el.offsetTop)
      this.themeTop.push(this.$refs.recommend.$el.offsetTop)
    })
  },
  mounted(){

  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    contentScoll(position){
      let positionY = -position.y;
      const length = this.themeTop.length;
      for(let i = 0; i < length; i++){
        if((i < length - 1 && positionY >= this.themeTop[i] && positionY < this.themeTop[i+1])||(i===length - 1 && positionY >= this.themeTop[i])){
          if(this.currentIndex !== i){
            this.currentIndex = i;
            this.$refs.dnav.currentIndex = this.currentIndex
          }
          break
        }
      }
      this.isShowBackTop = (-position.y) > 1000
    },
    titleClick(key){
      this.$refs.scroll.scrollTo(0,-this.themeTop[key])
    },
    addToCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.$store.dispatch('addToCart',product).then(res =>{
        this.message = res;
        this.isShow = true
        setTimeout(()=>{
          this.isShow = false;
          this.message = ""
        },1500)
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>