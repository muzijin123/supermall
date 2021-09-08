<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control
        @tabClick="tabClickHome"
        :titles="['流行', '新款', '精选']"
        ref="tabControl1"
        class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
    :probe-type="3"
    :pull-up-load = true
    @pullingUp="loadMore"
    @scroll="contentScroll">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <fearture-view/>
      <tab-control :titles="['流行', '新款', '精选']" ref="tabcontrol2" @tabClick="tabClickHome"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata} from 'network/home'
import {getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeartureView from './childComps/FeatureView.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import {backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeartureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    mixins:[backTopMixin],
    data(){
      return{
        banners: [],
        recommends: [],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}  
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      this.$nextTick(() =>{
        this.tabClickHome(0)
      })
      
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods:{
      tabClickHome(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;  
      },
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
