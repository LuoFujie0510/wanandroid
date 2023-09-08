import myAxios from "@/axios/myAxios";

export interface ProjectClassifyData {
    articleList: null,
    author: string,
    children: null,
    courseId: number,
    cover: string,
    desc: string,
    id: number,
    lisense: string,
    lisenseLink: string,
    name: string,
    order: number,
    parentChapterId: number,
    type: number,
    userControlSetTop: boolean,
    visible: number
}

export interface ProjectData {
    adminAdd: boolean,
    apkLink: string,
    audit: number,
    author: string,
    canEdit: boolean,
    chapterId: number,
    chapterName: string,
    collect: boolean,
    courseId: number,
    desc: string,
    descMd: string,
    envelopePic: string,
    fresh: boolean,
    host: string,
    id: number,
    isAdminAdd: boolean,
    link: string,
    niceDate: string,
    niceShareDate: string,
    origin: string,
    prefix: string,
    projectLink: string,
    publishTime: number,
    realSuperChapterId: number,
    selfVisible: number,
    shareDate: number,
    shareUser: string,
    superChapterId: number,
    superChapterName: string,
    title: string,
    type: number,
    userId: number,
    visible: number,
    zan: number
}
/**
 * 查询项目分类
 * @returns 
 */
export function qryProjectClassify() {
    return myAxios.get('/api/project/tree/json')
}
/**
 * 根据分类ID查询项目
 * @param page 
 * @param cid 
 * @returns 
 */
export function qryProject(page:number, cid: number){
    return myAxios.get(`/api/project/list/${page}/json?cid=${cid}`)
}