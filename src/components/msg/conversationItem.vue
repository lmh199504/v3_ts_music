<template>
    <div class="conversation" @click="toChat">
        <div class="left">
            <div class="avatar">
                <img class="avatarImg" :src="conData.fromUser.avatarUrl" alt="">
            </div>
        </div>
        <div class="center">
            <div class="fromUser">{{ conData.fromUser.nickname }}</div>
            <div class="message text_over_line">{{ msgText }}</div>
        </div>
        <div class="right">
            <div class="time">{{ dateFormat(conData.lastMsgTime, 'MM-dd') }}</div>
            <van-badge :show-zero="false" :offset="[10,10]" :content="conData.newMsgCount" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { dateFormat } from '@/utils'
import type { ConversationData } from '@/types/public/msg'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
interface Props{
    conData: ConversationData
}
const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
    conData: () => {
        return {
            fromUser: {
                nickname: '',
                avatarUrl: '',
                userId: 0,
                signature: '',
                gender: 0
            },
            lastMsg: '',
            lastMsgId: 0,
            lastMsgTime: 0,
            newMsgCount: 0,
            toUser: {
                nickname: '',
                avatarUrl: '',
                userId: 0,
                signature: '',
                gender: 0
            }
        }
    }
})

const msgText = computed(() => {
    console.log(JSON.parse(props.conData.lastMsg))
    const msgObj = (JSON.parse(props.conData.lastMsg))
    return msgObj.msg
})
function toChat() {
    router.push({
        path: '/conversation',
        query: {
            id: props.conData.fromUser.userId
        }
    })
}
</script>
<style scoped lang="less">
.conversation{
    display: flex;
    font-size: 30px;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--van-gray-3);
    padding: 10px 0;
    .center{
        flex: 1;
    }
    .left{
        flex-shrink: 0;
        margin-right: 10px;
        .avatar{
            position: relative;
            .avatarImg{
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
        }
    }
    .center{
        overflow: hidden;
        .fromUser{
            color: var(--my-text-color-black);
        }
        .message{
            margin-bottom: 10px;
            font-size: 24px;
            color: var(--my-text-color-gray);
            // max-width: 500px;
        }
    }
    .right{
        .time{
            margin-top: 20px;
            font-size: 24px;
            color: var(--my-text-color-gray);
        }
    }
}
</style>