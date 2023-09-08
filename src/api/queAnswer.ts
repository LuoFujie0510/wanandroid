import myAxios from "@/axios/myAxios"

export interface QueAnswerObj {

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
    tags: Array<Tag>,
    title: string,
    type: number,
    userId: number,
    visible: number,
    zan: number

}

interface Tag {
    name: string,
    url: string
}

export function qryQueAnswer(page: number){
    return myAxios.get(`/api/wenda/list/${page}/json `)
}