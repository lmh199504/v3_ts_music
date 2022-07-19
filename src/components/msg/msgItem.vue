<template>
    <div class="message_item" :class="messagePosition">
        <div v-if="messagePosition != 'position_center'">
            <Avatar :avatar-url="msgData.fromUser.avatarUrl" @tap-avatar="tapAvatar" />
        </div>
        <MsgBubble :is-mine="isMine" :msg-type="msgType">
            <TextMsg v-if="msgType === MsgType.text" :msg="msgData.msg" />
            <TimeMsg v-else-if="msgType === MsgType.time" :msg="msgData.msg" />
            <listenTogetherVue v-else-if="msgType === MsgType.together" :msg="msgData.msg" />
            <ImgMsg v-else-if="msgType === MsgType.img" :msg="msgData.msg" @previewImg="previewImg" />
            <SongMsg v-else-if="msgType === MsgType.song" :msg="msgData.msg" />
            <SheetMsg v-else-if="msgType === MsgType.sheet" :msg="msgData.msg" />
            <div v-else>
                消息类型：{{ msgType }}
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
import ImgMsg from './messageElement/imgMsg.vue' 
import SongMsg from './messageElement/songMsg.vue'
import SheetMsg from './messageElement/sheetMsg.vue'

const userStore = useUserStore()
const router = useRouter()
const { userInfo } = storeToRefs(userStore)
interface Props{
    msgData: MsgData
}
const emit = defineEmits<{
    (e: 'previewImg', value: string): void
}>()

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

function tapAvatar() {
    router.push({
        path: '/userInfo',
        query: {
            id: props.msgData.fromUser.userId
        }
    })
}
function previewImg(picUrl: string) {
    emit('previewImg', picUrl)
}

</script>
<style scoped lang="less">
.message_item{
    margin: 20px 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
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