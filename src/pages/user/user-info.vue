<script setup lang="ts">
import useUserStore from '@/stores/user/user'
import MyCollect from './components/my-collect.vue'
import MyShare from './components/my-share.vue'
import MyMessage from './components/my-message.vue'
import { ref } from 'vue'
import { qryCoinCount, qryUnReadCount } from '@/api/userinfo'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()
let level = ref('') //等级
let rank = ref('') //排名
let unReadCount = ref(0) //未读消息数量

const getCoinCount = async () => {
  const { data, errorCode, errorMsg } = await qryCoinCount()
  console.log('user-info', data)
  if (errorCode === 0) {
    level.value = data.level
    rank.value = data.rank
  }
}
const getUnReadCount = async () => {
  const { data, errorCode, errorMsg } = await qryUnReadCount()
  console.log('user-info', data)
  if (errorCode === 0) {
    unReadCount.value = data
  }
}

const toBack = function () {
  router.back()
}
getCoinCount()
getUnReadCount()
</script>

<template>
  <section>
    <div class="main">
      <a-button type="primary" size="mini" shape="circle" status="warning" @click="toBack">
        <template #icon>
          <icon-arrow-left />
        </template>
      </a-button>
      <div class="header">
        <a-space direction="vertical" :size="16" style="display: block">
          <a-row>
            <a-col class="avatar-center">
              <a-avatar :size="64" :style="{ backgroundColor: '#3370ff' }">{{
                userStore.userinfo.publicName || '未登录'
              }}</a-avatar>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="18">
              <label>本站积分</label>
            </a-col>
            <a-col :span="6">
              <span style="color: red">
                <a-space>
                  {{ userStore.userinfo.coinCount }}
                  <a-tag color="#ff7d00">lv {{ level }}</a-tag>
                  <a-tag color="#168cff">排名 {{ rank }}</a-tag>
                </a-space>
              </span>
            </a-col>
            <a-divider />
          </a-row>
          <a-row>
            <a-col :span="18">
              <label>未读消息</label>
            </a-col>
            <a-col :span="6">
              <span>{{ unReadCount }}条</span>
            </a-col>
            <a-divider />
          </a-row>
        </a-space>
      </div>
      <div class="content">
        <a-tabs class="list" default-active-key="1">
          <a-tab-pane key="1" title="我的收藏">
            <my-collect />
          </a-tab-pane>
          <a-tab-pane key="2" title="我的分享"> <my-share /> </a-tab-pane>
          <a-tab-pane key="3" title="历史消息">
            <my-message />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </section>
</template>
<style scoped>
.main {
  box-sizing: border-box;
  padding: 5% 20%;

  background: #fff;
  overflow: auto;
  height: 100vh;
}
.avatar-center {
  text-align: center;
}

.small-font-size {
  font-size: 12px;
}
:deep(.arco-tabs-nav-tab-list :first-child) {
  margin: 0 16px 0 0;
}
</style>
