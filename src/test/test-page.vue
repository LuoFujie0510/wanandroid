<template>
  <div class="main">
    <div class="content">
      <p v-for="item in 3" :key="item">{{ item }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

let timer: number;

const clickFun = () => {

  if(timer != null){
    clearTimeout(timer);
  }
  timer = setTimeout( () => {
    console.log('防抖')
  }, 1000)
}
clickFun();

let timerCopy: number;
const clickFunCopy = () => {
  if(timerCopy != null){
    return
  }
  timerCopy = setTimeout( ()=> {
    console.log('我是节流')
    
  }, 1000)
}
clickFunCopy();

clickFun.apply

</script>
<style scoped>
.main {
  background: #f53f3f;
  overflow:auto;
}
.content {
  margin: 0 auto;
}
.content p {
  background-color: red;
}
</style>
