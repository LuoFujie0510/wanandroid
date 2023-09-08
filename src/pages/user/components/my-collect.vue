<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Collect } from '@/api/myCollect'
import { qryMyCollect, unCollect } from '@/api/myCollect'
import { Message } from '@arco-design/web-vue'
import type { ApiRes } from '@/api/response'

let data = ref<Collect[]>([])
let page = ref(0)

onMounted(async () => {
  const result = await qryMyCollect(page.value)
  console.log('my-collect', result)
  data.value = result.data.datas
})
const cancelCollect = async (item: Collect, idx: number) => {
  const res = await unCollect(item.id, item.originId || -1)
  console.log('MyCollect cancelCollect', res)
  if (res.errorCode !== 0) {
    Message.error(res.errorMsg)
    return
  }
  Message.success('成功取消收藏')
  data.value.splice(idx, 1)
}
</script>
<template>
  <div>
    <a-list>
      <a-list-item v-for="(item, index) in data" :key="item.id">
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
          <a-popconfirm content="是否确认取消收藏?" @ok="cancelCollect(item, index)">
            <icon-delete style="font-size: 24px" :stroke-width="2" />
          </a-popconfirm>
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
