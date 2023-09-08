import myAxios from "@/axios/myAxios"
import { type ApiRes } from "./response"
export interface Collect {
    author: string,
    chapterId: number,
    chapterName: string,
    courseId: number,
    desc: string,
    envelopePic: string,
    id: number,
    link: string,
    niceDate: string,
    origin: string,
    originId: number,
    publishTime: number,
    title: string,
    userId: number,
    visible: number,
    zan: number
}

export function qryMyCollect(page: number){
    return myAxios.get(`/api/lg/collect/list/${page}/json`)
}
/**
 * 取消收藏-我的收藏
 * @param id 文章id
 * @param originId 文章列表id
 * @returns promise
 */
export function unCollect(id: number, originId: number){
    return myAxios.post<ApiRes>(`/api/lg/uncollect/${id}/json`, `originId=${originId}`)
}
/**
 * 取消收藏-首页
 * @param id 文章id
 */
export function unCollectOriginId(id: number){
    return myAxios.post<ApiRes>(`/api/lg/uncollect_originId/${id}/json`)
}
/**
 * 
 * @param id 文章id
 * @returns 
 */
export function collect(id: number){
    return myAxios.post<ApiRes>(`/api/lg/collect/${id}/json`)
}