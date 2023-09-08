
import Login from '../pages/login/login-index.vue'
import BasicLayoutVue from '@/layout/BasicLayout.vue'

import HotArticle from '../pages/hot/hot-article.vue'
import UserInfo from '../pages/user/user-info.vue'

export const routes = [
  {
    path: '/',
    name: '登录',
    component: Login,
  },
  {
    path: '/main',
    name: '主页',
    component: BasicLayoutVue,
    children: [
      {
        path: 'home',
        name: '热门博文',
        component: HotArticle
      },
      {
        path: 'website',
        name: '每日一问',
        component: () => import('../pages/qa/que-answer.vue')
      },
      {
        path: 'project',
        name: '项目分类',
        component: () => import('../pages/project/project-classify.vue')
      },
    ]
  },
  
  {
    path: '/userInfo',
    name: '用户中心',
    component: UserInfo,
  }


]
