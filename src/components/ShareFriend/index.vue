<template>
    <van-popup v-model:show="show" round position="bottom">
        <div class="content">
            <div class="title">分享</div>
            <div class="list">
                <van-list :loading="loading" :finished="finished" @load="onLoad">
                    <van-checkbox-group v-model="checked">
                        <van-checkbox v-for="item in list" :key="item.userId" :name="item.userId" checked-color="#ee0a24">
                            <div class="user_info">
                                <div class="avatar">
                                    <img :src="item.avatarUrl" alt="">
                                </div>
                                <div class="nickname">{{ item.nickname }}</div>
                            </div>
                        </van-checkbox>
                    </van-checkbox-group>
                </van-list>
            </div>
            <div class="btns box_shadow">
                <van-button round size="small" @click="show=false">取消</van-button>
                <van-button 
                    round
                    style="margin-left: 20px;" 
                    type="danger" 
                    size="small" 
                    :loading="btnLoading"
                    @click="sendMsg"
                >确定</van-button>
            </div>
        </div>
    </van-popup>
</template>
<script setup lang="ts">
import { reqUserFollows } from '@/api/user'
import { MsgType } from '@/types/public/msg'
import { computed, ref } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { UserInterface } from '@/types/public/user'
import { reqSendSong, reqSendSheet } from '@/api/msg'
import { Toast } from 'vant'

interface Props{
    source: MsgType
    visible: boolean
    sourceId: number
}
const emit = defineEmits<{
    (e: 'update:visible', value: boolean): boolean
}>()

const list = ref<UserInterface[]>([])
const checked = ref<number[]>([])
const userStore = useUserStore()
const { userInfo, isLogin } = storeToRefs(userStore)
const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
const btnLoading = ref<boolean>(false)
const props = withDefaults(defineProps<Props>(), {
    source: MsgType.song,
    visible: false,
    sourceId: 0
})
let offset = 0

const show = computed({
    get() {
        return props.visible
    },
    set(val) {
        emit('update:visible', val)
    }
})

function getList() {
    if (!isLogin.value) return
    reqUserFollows({
        uid: userInfo.value.userId,
        limit: 30,
        offset: 30 * offset
    })
    .then(res => {
        list.value = list.value.concat(res.data.follow)
        finished.value = !res.data.more
    })
}

function onLoad() {
    if (loading.value) return
    offset++
    getList()
}
getList()

function sendMsg() {
    if (props.source === MsgType.song) {
        sendSong()
    } else {
        sendSheet()
    }
}

function sendSong() {
    btnLoading.value = true
    reqSendSong({
        user_ids: checked.value.join(','),
        id: props.sourceId
    })
    .then(() => {
        Toast.success('发送成功')
    })
    .finally(() => {
        show.value = false
        btnLoading.value = false
    })
}

function sendSheet() {
    btnLoading.value = true
    reqSendSheet({
        user_ids: checked.value.join(','),
        playlist: props.sourceId
    })
    .then(() => {
        Toast.success('发送成功')
    })
    .finally(() => {
        btnLoading.value = false
        show.value = false
    })
}

</script>
<style scoped lang="less">
.content{
    height: 60vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .title{
        text-align: center;
        font-size: 34px;
        padding: 10px;
    }
    .list{
        flex: 1;
        overflow: auto;
        padding: 30px;
    }
    .user_info{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .avatar{
            margin-right: 20px;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
        .nickname{
            font-size: 30px;
            color: var(--my-text-color-black);
        }
    }
    .btns{
        display: flex;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>