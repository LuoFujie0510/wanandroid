import myAxios from "../axios/myAxios";
import { type ApiRes } from "./response";

export interface MsgObject {
     category: number,
     date: number,
     fromUser: string,
     fromUserId: number,
     fullLink: string,
     id: string,
     isRead: number,
     link: string,
     message: string,
     niceDate: string,
     tag: string,
     title: string,
     userId: number
}

export function qryIntegrate() {

    return myAxios.get('/api/lg/coin/userinfo/json')
}
/**
 * 查询用户信息
 * @returns 
 */
export function qryUserInfo() {
    return myAxios.get<ApiRes>('/api/user/lg/userinfo/json')
}
/**
 * 查询个人积分
 * @returns 
 */
export function qryCoinCount() {
    return myAxios.get('/api/lg/coin/userinfo/json')
}
/**
 * 查询未读消息数量
 */
export function qryUnReadCount() {
    return myAxios.get('/api/message/lg/count_unread/json')
}
/**
 * 查询已读消息列表
 * @param page 页码
 * @returns 
 */
export function qryReadMessage(page: number) {
    return myAxios.get(`/api/message/lg/readed_list/${page}/json`)
}