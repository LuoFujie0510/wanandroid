import type { Router } from "vue-router";

import useUserStore from '@/stores/user/user'

export default function setupUserInfoGuard(router: Router){

    
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();
        if(to.name === '登录'){
            next();
        }else{
            
            if(!userStore.publicName){
                console.log('请秋了一次用户信息')
                await userStore.info();
            }
            next();
        }
    })
}