<template>
  <div>
    <a-spin :loading="loading" dot>
      <a-list
        class="list-demo-action-layout"
        :scrollbar="false"
        @reach-bottom="qrySelf"
        :max-height="maxHeight"
        :data="list"
        :split="false"
      >
        <template #item="{ item }">
          <a-card :bordered="false" class="card">
            <a-list-item class="list-demo-item" action-layout="vertical">
              <template #extra>
                <div className="image-area">
                  <img alt="arco-design" :src="item.envelopePic" />
                </div>
              </template>
              <a-list-item-meta :title="item.title" :description="item.desc"> </a-list-item-meta>
            </a-list-item>
          </a-card>
        </template>
      </a-list>
    </a-spin>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { type ProjectData, qryProject } from '@/api/ProjectClassify'

let list = ref<ProjectData[]>([])
let page = ref(1)
let gCid = ref(0)
let loading = ref(false)

const maxHeight = window.screen.availHeight - 178
//查询列表
const qryList = async (pageNumber: number, cid: number) => {
  loading.value = true
  gCid.value = cid
  page.value = pageNumber
  try {
    const result = await qryProject(pageNumber, cid)
    list.value = result.data.datas
    console.log('classify-list', `查询${cid}数据`, list)

    page.value++
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
//加载更多
async function qrySelf() {
  const result = await qryProject(page.value, gCid.value)
  list.value = list.value.concat(result.data.datas)
}

defineExpose({ qryList })
</script>
<style scoped>
:deep(.arco-spin) {
  width: 100%;
}
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.list-demo-action-layout .card {
  cursor: pointer;
  margin: 20px 0;
}
</style>
