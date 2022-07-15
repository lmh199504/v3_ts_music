<template>
    <div class="conversation" :style="style">
        <van-nav-bar :title="userName" fixed left-arrow  @click="onClickLeft" />
        <div class="loaing" v-if="pullingDownLoading">
            <van-loading color="#e20001" />
        </div>
        <div class="scroll_wrapper" @click="hideTool">
            <Scroll :probe-type="3" :stop-propagation="true" ref="srcollRef" @pulling-down="pullingDown">
                <div class="list">
                    <MsgItem v-for="item in list" :key="item.id" :msg-data="item" />
                </div>
                <div class="end_el"></div>
            </Scroll>
        </div>
        <SendBox ref="sendBox" @change-height="refreshScroll" :to-user="uid" @send-success="sendSuccess" />
    </div>
</template>
<script setup lang="ts">
import { onClickLeft } from '@/utils/back'
import { reqPrivateHistory } from '@/api/msg'
import { nextTick, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { MsgData } from '@/types/public/msg'
import MsgItem from '@/components/msg/msgItem.vue'
import Scroll from '@/components/Scroll/index.vue'
import { reqUserDetail } from '@/api/user'
import { MsgType } from '@/types/public/msg'
import SendBox from '@/components/msg/sendBox.vue'

const srcollRef = ref<InstanceType<typeof Scroll>>()
const sendBox = ref<InstanceType<typeof SendBox>>()
const route = useRoute()
const uid = ref<number>(Number(route.query.id))
const list = ref<MsgData[]>([])
const userName = ref<string>('')
let before: undefined | number = undefined // 分页
const hasMore = ref<boolean>(false) // 是否还有消息未加载
// 顶部下拉加载
const pullingDownLoading = ref<boolean>(false)
const style = reactive({
    minHeight: window.innerHeight
})
function getHistory(type = 'more') {
    reqPrivateHistory({
        uid: uid.value,
        limit: 30,
        before: before,
        timestamp: Date.now()
    })
    .then(res => {
        const msgs = res.data.msgs
        list.value = list.value.concat(msgs)
        .sort((a, b) => a.time - b.time)
        .reduce((result: MsgData[], cur: MsgData) => {  // 添加中间时间类型为 MsgType.time 时间间隔大于30分钟就添加
            if (result.length) {
                const last = result[result.length - 1]
                if (Math.abs(last.time - cur.time) > 1000 * 60 * 30 && !last.lock) {
                    const msgJson = {
                        type: MsgType.time,
                        msg: cur.time
                    }
                    result.push({
                        ...cur,
                        id: cur.id + MsgType.time,
                        msg: JSON.stringify(msgJson),
                        lock: true
                    })
                    last.lock = true
                }
            }
            result.push(cur)
            return result
        }, []) // 根据时间排序
        before = list.value[0].time
        hasMore.value = res.data.more
        nextTick(() => {
            srcollRef.value?.refresh()
            if (type != 'more') {
                setTimeout(() => {
                    srcollRef.value?.scrollToElemet(document.querySelector('.end_el') as HTMLElement, 100)
                }, 1000)
            }
        })
    })
    .finally(() => {
        srcollRef.value?.finishPullDown()
        pullingDownLoading.value = false
    })
}
function getUserDetail() {
    reqUserDetail({
        uid: uid.value
    })
    .then(res => {
        userName.value = res.data.profile.nickname
    })
}
// 顶部加载
function pullingDown() {
    console.log('顶部加载')
    if (pullingDownLoading.value || !hasMore.value) return
    pullingDownLoading.value = true
    getHistory('more')
}
// 刷新scroll
function refreshScroll() {
    nextTick(() => {
        srcollRef.value?.refresh()
        srcollRef.value?.scrollToElemet(document.querySelector('.end_el') as HTMLElement, 100)
    })
}
// 隐藏工具
function hideTool() {
    sendBox.value?.hideAll()
}
// 发送成功
function sendSuccess(msgList: MsgData[]) {
    msgList.forEach((item) => {
        list.value.push(item)
    })
    refreshScroll()
}
getUserDetail()
getHistory('init')
</script>
<style scoped lang="less">
.conversation{
    height: 100vh;
    overflow: hidden;
    background-color: var(--my-back-color-gray);
    display: flex;
    flex-direction: column;
    .list{
        box-sizing: border-box;
        padding: 30px;
    }
    .scroll_wrapper{
        padding-top: 100px;
        flex: 1;
        overflow: hidden;
    }
    .loaing{
        position: fixed;
        top: 120px;
        display: flex;
        justify-content: center;
        width: 100%;
    }
}
</style>