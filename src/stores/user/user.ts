import { defineStore } from 'pinia'
import { type UserState } from './type'
import { qryUserInfo } from '@/api/userinfo'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    admin: undefined,
    chapterTops: [],
    coinCount: undefined,
    collectIds: [],
    email: undefined,
    icon: undefined,
    id: undefined,
    nickname: undefined,
    password: undefined,
    publicName: undefined,
    token: undefined,
    type: undefined,
    username: undefined
  }),

  getters: {
    userinfo(state: UserState): UserState {
      return { ...state }
    }
  },

  actions: {

    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await qryUserInfo();
      
      this.setInfo(res.data.userInfo);
    },
  }
})

export default useUserStore;

