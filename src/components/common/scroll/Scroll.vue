<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ObserveDOM from '@better-scroll/observe-dom'
  BScroll.use(ObserveDOM)

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM:true
      })
      /*setTimeout(() => {
        this.$nextTick(() => {
          this.scroll.refresh()
          console.log('---')
        })
      }, 2000)*/
      /*const refresh = this.debounce(this.scroll.refresh,50)

      this.$nextTick(() =>{
        refresh()
      })*/
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      }
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      },
      refresh(){
        this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
