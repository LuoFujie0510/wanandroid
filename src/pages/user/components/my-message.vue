<template>
  <div>
    <a-list>
      <a-list-item v-for="item in data" :key="item.id">
        <div class="content">
          <div class="title">
            <a-space>
              <a-tag color="#0fc6c2">{{ item.tag }}</a-tag>
              <span class="niceDate">{{ item.niceDate }}</span>
              <span class="fromUser">{{ `@${item.fromUser}` }}</span>
              <span>{{ item.title }}</span>
            </a-space>
          </div>
          <div>
            <a-link :href="item.message">
              <a-typography-paragraph  class="message">
                {{ item.message }}
              </a-typography-paragraph>
            </a-link>
          </div>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { qryReadMessage } from '@/api/userinfo'
import type { MsgObject } from '@/api/userinfo'
import { ref } from 'vue'

let page = ref(0)
let data = ref<MsgObject[]>([])

const getReadMsg = async () => {
  const res = await qryReadMessage(page.value)
  console.log('my-message', res.data)
  if (res.errorCode === 0) {
    data.value = res.data.datas
  }
}
getReadMsg()
</script>
<style scoped>
.title {
  display: flex;
  flex-direction: row;
}
.niceDate {
  font-size: 10px;
  text-align: bottom;
}
.fromUser {
  color: chocolate;
}
.message{
    word-wrap: break-word;
    overflow: hidden;
}
</style>
