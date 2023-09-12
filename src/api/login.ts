import myAxios from "../axios/myAxios"
import { type ApiRes } from './response';

export function login(data: string): Promise<ApiRes> {

    return myAxios.post('/api/user/login', data)
}