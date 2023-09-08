<script setup lang="ts">
import { getArticle } from '@/api/article'
import { type Article } from '@/api/article'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import useUserStore from '@/stores/user/user'
import { unCollectOriginId, collect } from '@/api/myCollect'
import { qryUserInfo } from '@/api/userinfo'

// const userStore = useUserStore()

const userStore = useUserStore()

let page = ref(0)
let data = ref<Article[]>([])
let bottom = ref(false)

let height = window.screen.availHeight
const maxHeight = height - 178
console.log('height', height)

const qryList = async () => {
  console.log('Test->page', page.value)
  const result = await getArticle(page.value)

  data.value = data.value.concat(result.data.datas || [])

  console.log('Test -> data', data)

  page.value += 1
}
//收藏文章
const collectArticle = (item: Article) => {
  //校验是否登录，未登录提示先进行登录操作
  if (!userStore.userinfo.publicName) {
    Message.warning('请先登录')
    return
  }
  //判断是否已收藏
  if (userStore.collectIds?.includes(item.id)) {
    cancelCollect(item.id)
  } else {
    doCollect(item.id)
  }
  //收藏成功之后，图标会切换成实心
}
const doCollect = async (id: number) => {
  const res = await collect(id)
  if (res.errorCode !== 0) {
    Message.error(res.errorMsg)
    return
  }
  updateUserInfo(true)
}
//取消收藏
const cancelCollect = async (id: number) => {
  const res = await unCollectOriginId(id)
  console.log('hot-article cancelCollect', res)
  if (res.errorCode !== 0) {
    Message.error(res.errorMsg)
    return
  }
  updateUserInfo(false)
}

//同步更新用户信息
const updateUserInfo = async (isSwitch: boolean) => {
  const { data, errorCode, errorMsg } = await qryUserInfo()
  if (errorCode !== 0) {
    Message.error(errorMsg)
    return
  }

  userStore.setInfo(data?.userInfo)
  Message.success(isSwitch ? '收藏成功' : '取消收藏成功')
}
//跳转文章详情
const toDetail = (url: string) => {
  window.open(url)
}
</script>
<template>
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
    <a-list-item class="list-item" v-for="item of data" :key="item.id" @click="toDetail(item.link)">
      <a-card :bordered="false">
        <div class="card">
          <div>
            <span>
              <a-typography-title :heading="6" style="font-weight: bold">
                <a-tag v-if="item.fresh" size="small" color="#f53f3f" style="margin-right: 0px"
                  >新</a-tag
                >
                {{ item.title }}
              </a-typography-title>
            </span>
            <div class="detail">
              <a-space align="end">
                <span class="detail-info" v-if="item.author">作者：{{ item.author }}</span>
                <span class="detail-info" v-else>分享人：{{ item.shareUser }}</span>
                <span class="detail-info"
                  >分类：{{ item.superChapterName }}/{{ item.chapterName }}</span
                >
                <span class="detail-info">时间：{{ item.niceDate }}</span>
              </a-space>
            </div>
          </div>
          <icon-heart-fill
            v-if="userStore.collectIds?.includes(item.id)"
            style="font-size: 24"
            @click.stop="cancelCollect(item.id)"
          />
          <icon-heart v-else style="font-size: 24" @click.stop="collectArticle(item)" />
        </div>
      </a-card>
    </a-list-item>
  </a-list>
</template>
<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.detail {
  display: flex;
}
.detail-info {
  font-size: 12px;
  padding: 5px 5px 0 0;
}
</style>
