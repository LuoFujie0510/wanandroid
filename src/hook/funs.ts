// 并发请求
export function multipleRequest(urls: string[], max: number) {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            resolve([])
        }
        const result: any[] = []
        let count = 0 //记录已经请求的数量
        let index = 0 //下一个请求的下标
        async function request() {
            const i = index
            const url = urls[index]
            index++
            try {
                const res = await fetch(url)
                result[i] = res
            } catch (err) {
                result[i] = err
            } finally {
                count++
                if (count === urls.length) {
                    resolve(result)
                }
                if (index < urls.length) {
                    request()
                }
            }
        }

        for (let i = 0; i < max; i++) {
            request()
        }
    })
}
