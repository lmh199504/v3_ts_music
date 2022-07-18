import { defineStore } from 'pinia'
import { reqMsgList } from '@/api/msg'
interface MsgState{
    newMsgCount: number
}
export const useMsgStore = defineStore('msg', {
    state: (): MsgState => ({
        newMsgCount: 0
    }),
    actions: {
        setNewMsgCount() {
            return new Promise((resolve, reject) => {
                reqMsgList({
                    limit: 1000,
                    offset: 0
                })
                .then(res => {
                    this.newMsgCount = res.data.newMsgCount
                    resolve(res)
                })
                .catch(e => {
                    reject(e)
                })
            })
        }
    }
})