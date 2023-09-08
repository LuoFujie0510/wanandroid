<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { login as userLogin } from '@/api/login'
import useUserStore from '@/stores/user/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  name: '18328625472',
  password: '18328625472'
})
const loading = ref(false)

const submit = async () => {
  console.log('login', form.name, form.password)
  if (!form.name || !form.password) {
    Message.error('please enter your username && password')
    return
  }
  loading.value = true
  try {
    let req = `username=${form.name}&password=${form.password}`
    const res = await userLogin(req)

    console.log('login->login', res)
    if (res.errorCode !== 0) {
      Message.error(`${res.errorMsg}`)
      return
    }

    userStore.setInfo(res.data)
    Message.success('登录成功')
    router.push({
      path: '/main'
    })
  } catch (err) {
    Message.error((err as Error).message)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="main">
    <div class="content">
      <h1>欢迎来到wanAndroid</h1>
      <a-spin :loading="loading">
        <a-form class="from" :model="form" layout="vertical">
          <a-form-item field="name" label="账号">
            <a-input v-model="form.name" placeholder="请输入账号...">
              <template #prefix> <icon-user /> </template
            ></a-input>
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input-password v-model="form.password" placeholder="请输入密码..." allow-clear>
              <template #prefix>
                <icon-safe />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button long type="primary" @click="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  width: 60%;
  text-align: center;
  margin: 0 auto;
}

h1 {
  text-align: center;
  animation: 1.8s text-blink-effect infinite alternate;
  font:
    180%/1.5 Baskerville,
    Palatino,
    serif;
}
.content {
  margin: 20px auto;
}

.from {
  width: 100%;
  margin-top: 5rem;
}

@keyframes text-blink-effect {
  50% {
    text-shadow:
      0 0 0.1em,
      0 0 0.3em;
  }
  to {
    text-shadow: 0 0 0.1em;
  }
}
</style>
