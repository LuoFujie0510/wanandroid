<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from '@/components/global-header.vue'
</script>

<template>
  <div class="main">
    <a-layout>
      <a-layout-header>
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped>
.main {
  background: #F2F3F5;
  overflow: hidden;
  height: 100vh;
}
.content{
  
}
</style>
