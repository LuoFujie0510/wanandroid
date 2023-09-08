<script setup lang="ts">
import { routes } from '@/router/routes'
import { useRouter, useRoute } from 'vue-router'
import { ref, type Ref, toValue } from 'vue'
import useUserStore from '@/stores/user/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()


const doMenuClick = (key: string) => {
  console.log('header', '初次调用', key)
  router.push({
    path: `/main/${key}`
  })
}

const childrenRoutes = routes[1].children

const path = route.path.substring(route.path.lastIndexOf('/') + 1)
const selectKeys: Ref<string[]> = ref([path])
doMenuClick('home')//初次进入
router.afterEach((to, from) => {
  selectKeys.value = [to.path.substring(route.path.lastIndexOf('/') + 1)]
})
</script>
<template>
  <div class="header">
    <a-row align="center">
      <a-col class="col">
        <a-menu mode="horizontal" @menu-item-click="doMenuClick" :selected-keys="selectKeys">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <a-avatar shape="square">
              <img alt="avatar" src="../assets/logo.png" />
            </a-avatar>
          </a-menu-item>
          <a-menu-item v-for="item in childrenRoutes" :key="item.path">{{ item.name }}</a-menu-item>
          <a-popover trigger="click">
            <a-avatar :style="{ backgroundColor: '#3370ff', float: 'right', cursor: 'pointer' }">{{
              userStore.userinfo.publicName || '未登录'
            }}</a-avatar>
            <template #content>
              <template v-if="userStore.userinfo.publicName">
                <div style="display: flex; flex-direction: column;">
                  <a-link href="/userInfo">
                  <template #icon>
                    <icon-user />
                  </template>
                  用户中心
                </a-link>
                <a-link href="/">
                  <template #icon>
                    <icon-export />
                  </template>
                  退出登录
                </a-link>
                </div>
              </template>
              <template v-else
              >
              <a-link href="/">
                  <template #icon>
                    <icon-import />
                  </template>
                  立即登录
                </a-link>
                
            </template>
            </template>
          </a-popover>
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>
<style scoped>
.header a-row {
  overflow: hidden;
  background-color: #ffffff;
}
.user_info {
  text-align: center;
}
</style>
