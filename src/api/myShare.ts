import myAxios from "@/axios/myAxios"
export interface Share {
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
    tags: [],
    title: string,
    type: number,
    userId: number,
    visible: number,
    zan: number
}

export function qryMyShare(page: number){
    return myAxios.get(`/api/user/lg/private_articles/${page}/json`)
}