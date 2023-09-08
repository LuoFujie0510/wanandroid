<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Share } from '@/api/myShare'
import { qryMyShare } from '@/api/myShare'

let data = ref<Share[]>([])
let page = ref(0)

onMounted(async () => {
  const result = await qryMyShare(page.value)
  console.log('my-share', result.data)
  data.value = result?.data.shareArticles.datas
})
</script>
<template>
  <div>
    <a-list>
      <a-list-item v-for="item in data" :key="item.id">
        <a-card :bordered="false">
          <div class="card">
            <div>
              <span>
                <a-typography-title :heading="6" style="font-weight: bold">
                  {{ item.title }}
                </a-typography-title>
              </span>
              <div>
                <a-space align="end">
                  <span class="detail-info">分类：{{ item.chapterName }}</span>
                  <span class="detail-info">时间：{{ item.niceDate }}</span>
                </a-space>
              </div>
            </div>
          </div>
        </a-card>
        <template #actions>
          <icon-delete style="font-size: 24px" :stroke-width="2"/>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<style scoped>
.detail-info {
  font-size: 12px;
  padding: 5px 5px 0 0;
}
</style>
