import myAxios from "../axios/myAxios"

export function login(data: string){
    
    return myAxios.post('/api/user/login', data)
}