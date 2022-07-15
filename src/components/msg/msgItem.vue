<template>
    <div class="message_item" :class="messagePosition">
        <div v-if="messagePosition != 'position_center'">
            <Avatar :avatar-url="msgData.fromUser.avatarUrl" @tap-avatar="tapAvatar" />
        </div>
        <MsgBubble :is-mine="isMine" :is-center="messagePosition == 'position_center'">
            <TextMsg v-if="payload.type === MsgType.text" :msg="msgData.msg" />
            <TimeMsg v-else-if="payload.type === MsgType.time" :msg="msgData.msg" />
            <listenTogetherVue v-else-if="payload.type === MsgType.together" :msg="msgData.msg"/>
            <div v-else>
                消息类型：{{ payload.type }}
            </div>
        </MsgBubble>    
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { computed, ComputedRef } from 'vue'
import type { MsgData } from '@/types/public/msg'
import { storeToRefs } from 'pinia'
import Avatar from './avatar.vue'
import MsgBubble from './msgBubble.vue'
import TextMsg from './messageElement/textMsg.vue'
import TimeMsg from './messageElement/timeMsg.vue'
import { MsgType } from '@/types/public/msg'
import listenTogetherVue from './messageElement/listenTogether.vue'

const userStore = useUserStore()
const router = useRouter()
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
const msgType = computed(() => {
    return JSON.parse(props.msgData.msg).type
})
//  消息位置
const messagePosition: ComputedRef<string> = computed(() => {
    if (msgType.value === MsgType.time) { // 中间
        return 'position_center'
    } else if (isMine.value) { // 右边
        return 'position_right'
    } else { // 左边
        return 'position_left'
    }
}) 

const payload = computed(() => {
    return JSON.parse(props.msgData.msg)
})
function tapAvatar() {
    router.push({
        path: '/userInfo',
        query: {
            id: props.msgData.fromUser.userId
        }
    })
}
</script>
<style scoped lang="less">
.message_item{
    margin: 20px 0;
    display: flex;
    align-items: center;
}
.position_center{
    justify-content: center;
}
.position_right{
    flex-direction: row-reverse;
}
.position_left{
    justify-content: flex-start;
}
</style>