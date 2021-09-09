<template>
  <div class="home">
      <el-button >文字按钮</el-button>
    <div @click="skipPage">跳转about页面</div>
    <div @click="skipPagew('one')">跳转 横屏1 页面</div>
    <div @click="skipPagew('tow')">跳转 横屏2 页面</div>
    <div @click="skipPagew('three')">跳转 横屏3 页面</div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
   
  },
  methods:{
      skipPage:function(){
          this.$router.push({ name: 'About'});
      },
      skipPagew:function(type){
          switch (type) {
              case "tow":
                this.$router.push({ name: 'horTwo'});
                  break;
              case 'three':
                this.$router.push({ name: 'horThree'});
                  break;
          
              default:
                   this.$router.push({ name: 'hor'});
                  break;
          }
         
      }

  }
}
</script>
