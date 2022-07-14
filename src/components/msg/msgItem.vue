<template>
    <div class="message_item" :class="messagePosition">
        <div>
            头像
        </div>
        <div>
            消息内容
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store'
import { computed, ComputedRef } from 'vue'
import type { MsgData } from '@/types/public/msg'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
interface Props{
    msgData: MsgData
}
const props = withDefaults(defineProps<Props>(), {
    msgData: () => {
        return {
            fromUser: {
                nickname: '',
                avatarUrl: '',
                userId: 0,
                signature: '',
                gender: 0
            },
            toUser: {
                nickname: '',
                avatarUrl: '',
                userId: 0,
                signature: '',
                gender: 0
            },
            msg: '',
            time: 0,
            id: 0,
            batchId: 0,
            realFromUser: null
        }
    }
})
// 是否是我发送出去的
 const isMine: ComputedRef<boolean> = computed(() => {
    return props.msgData.fromUser.userId === userInfo.value.userId
 })
//  消息位置
const messagePosition: ComputedRef<string> = computed(() => {
    if (isMine.value) { // 右边
        return 'position_right'
    } else { // 左边
        return 'position_left'
    }
}) 
</script>
<style scoped lang="less">
.message_item{
    margin: 20px 0;
    display: flex;
}
.position_right{
    flex-direction: row-reverse;
}
.position_left{
    justify-content: flex-start;
}
</style>