<template>
  <div class="home">
      <el-button >文字按钮</el-button>
    <div @click="skipPage">跳转about页面</div>
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
      }
  }
}
</script>
