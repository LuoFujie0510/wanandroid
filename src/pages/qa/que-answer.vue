<template>
  <div class="main">
    <a-list
      :max-height="maxHeight"
      :scrollbar="false"
      class="list"
      @reach-bottom="qryList()"
      :split="false"
    >
      <template #scroll-loading>
        <div v-if="bottom">No more data</div>
        <a-spin v-else />
      </template>
      <a-list-item class="list-item" v-for="item of list" :key="item.id">
        <a-card :bordered="false" @click="toDetail(item.link)">
          <div class="card">
            <h3>{{ item.title }}</h3>
            <div class="detail">
              <a-space align="end">
                <span class="detail-info" v-if="item.author">作者：{{ item.author }}</span>
                <span class="detail-info"
                  >分类：{{ item.superChapterName }}/{{ item.chapterName }}</span
                >
                <span class="detail-info">时间：{{ item.niceDate }}</span>
              </a-space>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { qryQueAnswer, type QueAnswerObj } from '@/api/queAnswer'

const page = ref(1)
let bottom = ref(false)
const list = ref<QueAnswerObj[]>([])

const maxHeight = window.screen.availHeight - 178

//查询列表
const qryList = async () => {
  const result = await qryQueAnswer(page.value)
  list.value = list.value.concat(result.data.datas || [])
  console.log('Test -> list', list)

  page.value += 1
}
//跳转详情页
const toDetail = (url: string) => {
  console.log('test', url)
}
</script>
<style scoped>
.main {
  box-sizing: border-box;
  overflow: hidden;
}

.list {
  overflow: auto;
}

.card {
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
}

.detail {
}
.detail-info {
  font-size: 12px;
  padding: 5px 5px 0 0;
}
</style>
