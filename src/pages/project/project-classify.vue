<template>
  <div class="main">
    <a-menu class="menu" mode="vertical" :selected-keys="selectKeys" @menu-item-click="itemClick">
      <a-menu-item v-for="item in classifyList" :key="item.id.toString()">{{
        item.name
      }}</a-menu-item>
    </a-menu>
    <div class="content">
      <classify-list ref="classifyData"></classify-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { type ProjectClassifyData, qryProjectClassify } from '@/api/ProjectClassify'
import ClassifyList from './components/classify-list.vue'

const classifyData = ref<any>(null)
//分类数据
let classifyList = reactive<ProjectClassifyData[]>([])
//选中分类
let selectKeys = ref<string[]>([])
//项目分类id
let cid = ref(0)
//查询分类数据
const qryClassifyList = async () => {
  const result = await qryProjectClassify()

  classifyList = result.data
  classifyList.forEach((item) => {
    if (item.name.includes('amp;')) {
      item.name = item.name.replace('amp;', '')
    }
  })
  selectKeys.value = [classifyList[0].id.toString()]
  cid.value = classifyList[0].id

  console.log('project-classify', selectKeys, cid)

  classifyData.value?.qryList(1, cid.value)
}
qryClassifyList()
//菜单点击
const itemClick = (key: string) => {
  console.log('点击了菜单', key)
  selectKeys.value = [key];
  classifyData.value?.qryList(1, key)
}
</script>
<style scoped>
.main {
  display: flex;
  flex: 1;
}
.menu {
  width: 160px;
  height: 100vh;
  padding-bottom: 20px;
}
.content {
  flex: 1;
}
</style>
