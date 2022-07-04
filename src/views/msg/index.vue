<template>
    <MiniPlayOut>
        <div class="msg">
            <van-nav-bar title="我的消息" left-arrow fixed placeholder @click-left="onClickLeft" />
            <van-list :loading="loading" :finished="finished" @load="onLoad">
                <ConversationItem v-for="(item ,index) in list" :key="index" :con-data="item" />
            </van-list>
        </div>
    </MiniPlayOut>  
</template>
<script setup lang="ts">
import { reqMsgList } from '@/api/msg'
import { ref } from 'vue'
import { onClickLeft } from '@/utils/back'
import ConversationItem from '@/components/msg/conversationItem.vue'
import type { ConversationData } from '@/types/public/msg'

const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const list = ref<ConversationData[]>([])
const limit = 20
let offset = -1
function getMsgList() {
    reqMsgList({
        limit: limit,
        offset: limit * offset
    })
    .then(res => {
        list.value = list.value.concat(res.data.msgs)
    })
}
function onLoad() {
    offset++
    getMsgList()
}
</script>
<style scoped lang="less">
.msg{
    overflow: auto;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
}
</style>